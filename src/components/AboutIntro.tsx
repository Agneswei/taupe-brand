    import React from 'react';
    import { Link } from 'react-router-dom';

    const AboutIntro: React.FC = () => {
    return (
        <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] my-16">
        <div className="relative h-[500px] md:h-[400px] overflow-hidden">
            {/* Background Image */}
            <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url('/about/about-intro-bg.jpg')` // Replace with your image path
            }}
            >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                
                {/* Left Column - Text Content */}
                <div className="text-white">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                    Designed To Empower<br />
                    <span className="font-normal">Your Every Day</span>
                    </h2>
                    
                    <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-90 max-w-md">
                    Taupe blends timeless elegance with practical comfort, creating pieces you’ll reach for again and again.                </p>
                    
                    <Link
                    to="/about"
                    className="inline-block bg-white text-black px-8 py-3 text-sm font-medium tracking-wide uppercase hover:bg-gray-100 transition-colors duration-300"
                    >
                    Learn More
                    </Link>
                </div>

                {/* Right Column - Space for background image to show through */}
                <div className="hidden lg:block">
                    {/* This space allows the background image to show through */}
                </div>
                </div>
            </div>
            </div>
        </div>

       
        </section>
    );
    };

    export default AboutIntro;