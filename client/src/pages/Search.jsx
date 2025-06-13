import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { FaMapMarkerAlt, FaSearch, FaCamera } from "react-icons/fa";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState("10");
  const [imageFile, setImageFile] = useState(null);
  const [searchMode, setSearchMode] = useState("name");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const navigate = useNavigate();

  const fetchUserLocation = () => {
    if ("geolocation" in navigator) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toFixed(6));
          setLongitude(position.coords.longitude.toFixed(6));
          setLoadingLocation(false);
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Failed to get location. Please enter manually.");
          setLoadingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSearchSubmit = () => {
    if (searchMode === "location") {
      if (!latitude.trim() || !longitude.trim() || !radius.trim()) {
        alert("Please enter latitude, longitude, and radius.");
        return;
      }
      navigate(`/locationR?latitude=${latitude}&longitude=${longitude}&radius=${radius}`);
    } else if (searchMode === "image") {
      if (!imageFile) {
        alert("Please upload an image.");
        return;
      }
      navigate("/image-search", { state: { imageFile } });
    } else {
      if (!searchQuery.trim()) {
        alert("Please enter a search term.");
        return;
      }
      navigate(`/namesearch?name=${searchQuery}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Navbar textWhite={true} />

      <div className="container mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <h1 className="text-5xl font-bold mb-8">Find Your Perfect Restaurant</h1>
          
          <div className="flex justify-center gap-4 mb-12">
            {["name", "location", "image"].map((mode) => (
              <motion.button
                key={mode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchMode(mode)}
                className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                  searchMode === mode
                    ? "bg-yellow-400 text-gray-900"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                {mode === "name" && "Search by Name"}
                {mode === "location" && "Search by Location"}
                {mode === "image" && "Search by Image"}
              </motion.button>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
            <AnimatePresence mode="wait">
              {searchMode === "name" && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter restaurant name..."
                    className="w-full px-6 py-4 text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </motion.div>
              )}

              {searchMode === "location" && (
                <motion.div
                  key="location"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      placeholder="Latitude"
                      className="px-6 py-4 text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <input
                      type="text"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      placeholder="Longitude"
                      className="px-6 py-4 text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  <input
                    type="number"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    placeholder="Radius (km)"
                    className="w-full px-6 py-4 text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button
                    onClick={fetchUserLocation}
                    className="w-full px-6 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaMapMarkerAlt />
                    {loadingLocation ? "Getting location..." : "Use my location"}
                  </button>
                </motion.div>
              )}

              {searchMode === "image" && (
                <motion.div
                  key="image"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <label className="w-full h-40 border-2 border-dashed border-white/30 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-yellow-400 transition-colors">
                    <FaCamera className="text-3xl mb-2" />
                    <span>{imageFile ? imageFile.name : "Upload an image"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSearchSubmit}
              className="mt-8 w-full px-8 py-4 bg-yellow-400 text-gray-900 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
            >
              <FaSearch className="inline mr-2" />
              Search Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Search;