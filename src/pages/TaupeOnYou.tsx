// src/pages/TaupeOnYou.tsx
import React from 'react';

// Define a type for the user-generated content
type UserContent = {
  imageUrl: string;
  username: string;
};

const TaupeOnYou: React.FC = () => {
  // Sample data with images and Instagram usernames
  const userContent: UserContent[] = [
    // First row - examples
    { 
      imageUrl: "/taupe-on-you/1.png", 
      username: "@kikinicha_"
    },
    { 
      imageUrl: "/taupe-on-you/2.png", 
      username: "@emily_nyc"
    },
    { 
      imageUrl: "/taupe-on-you/3.png", 
      username: "@osnn"
    },
    { 
      imageUrl: "/taupe-on-you/4.png", 
      username: "@pleww"
    },
    { 
      imageUrl: "/taupe-on-you/5.png", 
      username: "@yinyinbae"
    },
    { 
      imageUrl: "/taupe-on-you/6.png", 
      username: "@grgracyy"
    },
    { 
      imageUrl: "/taupe-on-you/7.png", 
      username: "@paulineth"
    },
    { 
      imageUrl: "/taupe-on-you/8.png", 
      username: "@osnn"
    },
    { 
      imageUrl: "/taupe-on-you/9.png", 
      username: "@minniemeyapa"
    },
    { 
      imageUrl: "/taupe-on-you/10.png", 
      username: "@thisistewly"
    },
    { 
      imageUrl: "/taupe-on-you/11.png", 
      username: "@nunnun.ntp"
    },
    { 
      imageUrl: "/taupe-on-you/12.png", 
      username: "@rinratabelle"
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-light text-center mb-6">
        #WearTaupe — A page dedicated to how good we look together.
      </h1>
      
      <p className="text-center mb-8 text-gray-600 max-w-2xl mx-auto">
        See how our community styles their favorite TAUPE pieces. Tag us with #WearTaupe 
        on Instagram for a chance to be featured.
      </p>

      {/* Grid layout displaying user content */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {userContent.map((content, idx) => (
          <div key={idx} className="relative aspect-square overflow-hidden group">
            <img
              src={content.imageUrl}
              alt={`TAUPE styled by ${content.username}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Instagram username overlay */}
            <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
              {content.username}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaupeOnYou;