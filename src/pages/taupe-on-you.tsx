// src/pages/TaupeOnYou.tsx
import React from 'react';

const TaupeOnYou: React.FC = () => {
  const imageCount = 12; // or however many you uploaded
  const imageUrls = Array.from({ length: imageCount }, (_, i) => `/taupe-on-you/${i + 1}.jpg`);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-light text-center mb-10">
        Taupe on You — A page dedicated to how good we look together.
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {imageUrls.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={`Taupe on You ${idx + 1}`}
            className="w-full object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default TaupeOnYou;
