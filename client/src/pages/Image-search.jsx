import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { FaImage, FaUpload } from "react-icons/fa";
import RestaurantCard from "../components/RestaurantCard";

const ImageSearch = () => {
  const location = useLocation();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  // Extract image from state if coming from search page
  useEffect(() => {
    const image = location.state?.imageFile;
    if (image) {
      handleImageUpload({ target: { files: [image] } });
    }
  }, [location.state]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      setUploadedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      searchRestaurants(file);
    }
  };

  const searchRestaurants = async (image) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch("https://api.example.com/restaurants/image-search", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to search restaurants');
      }

      const data = await response.json();
      setRestaurants(data.restaurants || []);
    } catch (err) {
      setError('Error searching restaurants. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-8">
            Find Restaurants by Image
          </h1>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <div className="flex flex-col items-center">
              <AnimatePresence mode="wait">
                {!previewUrl ? (
                  <motion.label
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full max-w-md h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-yellow-400 transition-colors"
                  >
                    <FaImage className="text-4xl text-gray-400 mb-4" />
                    <span className="text-gray-600">Click to upload an image</span>
                    <span className="text-sm text-gray-400 mt-2">or drag and drop</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </motion.label>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative w-full max-w-md"
                  >
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => {
                        setPreviewUrl(null);
                        setUploadedImage(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 mt-4"
                >
                  {error}
                </motion.p>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
            </div>
          ) : restaurants.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {restaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <RestaurantCard restaurant={restaurant} />
                </motion.div>
              ))}
            </motion.div>
          ) : uploadedImage && !loading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-600"
            >
              No restaurants found matching this image.
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ImageSearch;