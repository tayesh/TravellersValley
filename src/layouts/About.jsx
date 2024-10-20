import React from 'react';

const About = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">About Travellers Valley</h1>
                <p className="text-gray-700 text-lg mb-4">
                    Welcome to Travellers Valley, your ultimate destination for all things travel! Our mission is to inspire and empower travelers around the world to explore new places, experience different cultures, and create unforgettable memories.
                </p>
                <p className="text-gray-700 text-lg mb-4">
                    Founded in 2024, Travellers Valley started as a small travel blog and has grown into a comprehensive travel guide and community. We offer tips, guides, and resources to help you plan your perfect trip, whether it's a weekend getaway or a months-long adventure.
                </p>
                <p className="text-gray-700 text-lg mb-4">
                    Our team of passionate travelers is dedicated to sharing their knowledge and experiences to help you travel smarter and safer. We believe that travel is not just about the destination, but also about the journey and the stories you collect along the way.
                </p>
                <div className="mt-8">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Values</h2>
                    <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
                        <li>Inspiration: Encouraging people to explore new places and cultures.</li>
                        <li>Empowerment: Providing resources and information to help travelers make informed decisions.</li>
                        <li>Community: Building a network of like-minded travelers who share their experiences and support each other.</li>
                        <li>Sustainability: Promoting responsible and sustainable travel practices.</li>
                    </ul>
                </div>
                <div className="mt-8">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Meet the Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
                        <div className="flex items-center">
                            <img src="https://i.ibb.co/rF4f28S/Whats-App-Image-2024-08-31-at-00-31-51-55665963.jpg" alt="Team Member 1" className="w-24 rounded-full mr-4"/>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Md.Naeem Islam</h3>
                                <p className="text-gray-600">Founder & CEO</p>
                            </div>
                        </div>
                        {/* Add more team members as needed */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
