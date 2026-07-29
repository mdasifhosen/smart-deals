import React from 'react';
import { Link } from "react-router";




const Product = ({ product }) => {
    const { _id, title, price_min, price_max, image } = product;

    return (
      <div className="card bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200">
        {/* Image */}
        <figure className="h-64 overflow-hidden p-5 ">
          <img
            src={image}
            alt={``}
            className="w-full h-full object-center  hover:scale-105  duration-300 rounded-2xl "
          />
        </figure>

        {/* Content */}
        <div className="p-5">
          <h2 className="text-2xl font-bold text-gray-800 line-clamp-2">
            {title}
          </h2>

          <p className="text-xl font-semibold text-primary mt-2">
            ${price_min} - ${price_max}
          </p>

          <Link
            to={`/productDetails/${_id}`}
            className="btn btn-outline btn-primary w-full mt-6 rounded-xl"
          >
            View Details
          </Link>
        </div>
      </div>
    );
};

export default Product;