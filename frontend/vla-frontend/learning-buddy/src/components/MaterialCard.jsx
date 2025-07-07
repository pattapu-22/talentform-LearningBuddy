import React from "react";

const MaterialCard = ({ material }) => {
  if (!material) return null;

  const { title, category, type, link } = material;

  const handleClick = () => {
    console.log("Card clicked:", material);

    if (link) {
      console.log("✅ Link found:", link);
      window.open(link, "_blank");
    } else {
      console.error(`❌ No link found for material: ${title}`);
      alert(`No link found for "${title || "Untitled"}"`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
    >
      <h3 className="text-lg font-bold mb-1">{title || "Untitled"}</h3>
      <p className="text-sm text-gray-600">{category || "Unknown Category"}</p>
      <span className="text-xs text-blue-500 mt-1 inline-block">{type || "Unknown Type"}</span>
    </div>
  );
};

export default MaterialCard;
