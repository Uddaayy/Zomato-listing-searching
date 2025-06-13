import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { FaStar, FaMapMarkerAlt, FaPhone, FaClock, FaDollarSign } from "react-icons/fa";

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`https://api.example.com/restaurants/${id}`);
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <p className="text-xl text-gray-600">Restaurant not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden"
          >
            <div className="relative h-96">
              <img
                src={restaurant.image || "https://via.placeholder.com/1200x400"}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="font-semibold">{restaurant.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{restaurant.cuisine}</span>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">About</h2>
                  <p className="text-gray-600 leading-relaxed">{restaurant.description}</p>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <FaMapMarkerAlt className="text-yellow-400" />
                      <span>{restaurant.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <FaPhone className="text-yellow-400" />
                      <span>{restaurant.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <FaClock className="text-yellow-400" />
                      <span>{restaurant.hours}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <FaDollarSign className="text-yellow-400" />
                      <span>{restaurant.priceRange}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">Menu Highlights</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {restaurant.menuItems?.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-50 p-4 rounded-lg"
                      >
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                        <p className="text-yellow-600 font-semibold mt-2">${item.price}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                <div className="space-y-6">
                  {restaurant.reviews?.map((review, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-200 pb-6"
                    >
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <span className="font-semibold">{review.rating}</span>
                        </div>
                        <h3 className="font-semibold">{review.author}</h3>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;