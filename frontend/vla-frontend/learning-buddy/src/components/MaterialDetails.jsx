// src/components/MaterialDetails.jsx
import React from "react";

const MaterialDetails = ({ material, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-lg">
        <button onClick={onClose} className="text-red-500 float-right">✖</button>
        <h2 className="text-xl font-bold mb-3">{material.title}</h2>
        <p><strong>Type:</strong> {material.type}</p>
        <p><strong>Category:</strong> {material.category}</p>
        <p><strong>Size:</strong> {material.size}</p>
        <p><strong>Description:</strong> {material.description}</p>
        <p><strong>Difficulty:</strong> {material.difficulty}</p>
      </div>
    </div>
  );
};

export default MaterialDetails;
