import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaStar, FaMapMarkerAlt, FaDollarSign } from "react-icons/fa";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 8;

  useEffect(() => {
    // Simulated API call - replace with your actual API endpoint
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('https://zomato-listing-searching.onrender.com/restaurants');

        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Discover Amazing Restaurants
        </motion.h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentRestaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <img
                      src={restaurant.featured_image || "https://via.placeholder.com/300x200"}
                      alt={restaurant.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span className="font-semibold">{restaurant.user_rating?.aggregate_rating}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                    
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <FaMapMarkerAlt />
                      <span>{restaurant.location?.city}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <FaDollarSign />
                      <span>{restaurant.average_cost_for_two}</span>
                    </div>

                    <Link
                      to={`/restaurant/${restaurant.id}`}
                      className="block w-full text-center py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-12 mb-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-6 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 bg-yellow-400 rounded-lg">
                Page {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={indexOfLastRestaurant >= restaurants.length}
                className="px-6 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;