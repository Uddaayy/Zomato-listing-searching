import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaStar, FaMapMarkerAlt, FaUtensils } from "react-icons/fa";

const RestaurantCard = ({ restaurant }) => {
  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-500";
    if (rating >= 3) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card group"
    >
      <div className="relative">
        <LazyLoadImage
          src={restaurant.featured_image || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
          effect="blur"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
          <FaStar className={getRatingColor(restaurant.user_rating?.aggregate_rating)} />
          <span className="font-semibold">
            {restaurant.user_rating?.aggregate_rating || "N/A"}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-accent-600 transition-colors">
          {restaurant.name}
        </h3>

        <div className="flex items-center space-x-2 text-gray-600">
          <FaMapMarkerAlt />
          <span className="text-sm">{restaurant.location?.locality || "Location not available"}</span>
        </div>

        <div className="flex items-center space-x-2 text-gray-600">
          <FaUtensils />
          <span className="text-sm truncate">
            {restaurant.cuisines || "Cuisines not available"}
          </span>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <Link
            to={`/restaurant/${restaurant.id}`}
            className="btn btn-primary w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;