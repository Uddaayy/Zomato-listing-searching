import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { FaUtensils, FaSearch } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
            alt="Restaurant background"
            className="w-full h-full object-cover"
          />
        </div>

        <Navbar textWhite={true} />

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Discover Your Next
              <span className="text-yellow-400"> Favorite Restaurant</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-200">
              Find the perfect dining experience with our curated selection of restaurants
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/restaurants")}
                className="px-8 py-4 bg-yellow-400 text-black rounded-full font-semibold text-lg flex items-center justify-center gap-2 hover:bg-yellow-300 transition-colors"
              >
                <FaUtensils />
                Browse Restaurants
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/search")}
                className="px-8 py-4 bg-white text-black rounded-full font-semibold text-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
              >
                <FaSearch />
                Search Restaurants
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: "🔍",
                title: "Search",
                description: "Find restaurants by name, location, or even by uploading a food image"
              },
              {
                icon: "📍",
                title: "Locate",
                description: "Discover restaurants near you with our location-based search"
              },
              {
                icon: "⭐",
                title: "Review",
                description: "Read detailed reviews and ratings from other food lovers"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;