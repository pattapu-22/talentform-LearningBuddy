
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { logActivity } from "../utils/logActivity";
import {
  BookOpen,
  Grid,
  List,
  Search,
  Plus,
} from "lucide-react";

const MaterialsPage = () => {
  const [materialsList, setMaterialsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewLink, setPreviewLink] = useState("");
  const [user, setUser] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const snapshot = await getDocs(collection(db, "materials_data"));
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMaterialsList(data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  const getTypeColor = (type) => {
    switch (type) {
      case "video": return "bg-red-100 text-red-800";
      case "document": return "bg-blue-100 text-blue-800";
      case "audio": return "bg-green-100 text-green-800";
      case "presentation": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      newFavorites.has(id) ? newFavorites.delete(id) : newFavorites.add(id);
      return newFavorites;
    });
  };

  const handlePreviewMaterial = async (material) => {
    setPreviewLink(material.link);
    setShowPreviewModal(true);

    if (user) {
      try {
        await logActivity(user, {
          type: "material",
          title: material.title || "Untitled Material",
        });
      } catch (error) {
        console.error("Failed to log material activity:", error);
      }
    }
  };

  const filteredMaterials = materialsList.filter((material) => {
    const matchesType = selectedType === "all" || material.type === selectedType;
    const matchesSearch =
      material.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  if (loading) return <div className="p-4">Loading materials...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Materials</h1>
              <p className="text-gray-600">Access your learning resources and study materials</p>
            </div>
            {/* <button
              onClick={() => setShowUploadModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Upload Material</span>
            </button> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="card p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{materialsList.length}</p>
                  <p className="text-sm text-gray-600">Total Materials</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 w-full"
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Types</option>
              <option value="video">Video</option>
              <option value="audio">Audio</option>
              <option value="document">PDF</option>
              <option value="presentation">Presentation</option>
            </select>

            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" : "space-y-4"}`}>
          {filteredMaterials.length > 0 ? (
            filteredMaterials.map((material) => (
              <div
                key={material.id}
                className="card p-4 group hover:shadow-md transition cursor-pointer"
                onClick={() => handlePreviewMaterial(material)}
              >
                <div className="flex flex-col space-y-2">
                  <h2 className="text-lg font-semibold text-gray-900">{material.title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">{material.description}</p>
                  <div className="flex items-center flex-wrap gap-2 text-xs mt-2">
                    {material.tags?.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{tag}</span>
                    ))}
                    {material.difficulty && (
                      <span className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(material.difficulty)}`}>{material.difficulty}</span>
                    )}
                    {material.type && (
                      <span className={`px-2 py-1 rounded-full font-medium ${getTypeColor(material.type)}`}>{material.type}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No materials found.</div>
          )}
        </div>

        {showPreviewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl h-[80vh] relative">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
              >✕</button>
              <iframe
                src={previewLink}
                title="Preview"
                className="w-full h-full rounded-b-xl"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialsPage;
