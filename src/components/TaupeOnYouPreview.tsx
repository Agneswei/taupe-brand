// components/TaupeOnYouPreview.tsx
import React from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/taupe1.png";
import img2 from "../assets/taupe2.png";

const TaupeOnYouPreview: React.FC = () => {
  return (
    <section className="my-12 px-6 text-center">
      <Link
        to="/taupe-on-you"
        className="inline-block mb-6 text-lg font-medium underline hover:text-gray-600 transition"
      >
        Taupe on You
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <img src={img1} alt="Taupe Look 1" className="w-full h-auto object-cover" />
        <img src={img2} alt="Taupe Look 2" className="w-full h-auto object-cover" />
      </div>
    </section>
  );
};

export default TaupeOnYouPreview;
