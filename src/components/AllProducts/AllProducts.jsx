import React from 'react';
import { useLoaderData } from 'react-router';
import { Link } from "react-router";


const AllProducts = () => {
    const products = useLoaderData();
    // const {_id:productId}=products

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 m-5">
        {products.map((product) => (
          <div className="card bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 ">
            {/* Image */}
            <figure className="h-64 overflow-hidden p-5 ">
              <img
                src={product.image}
                alt={``}
                className="w-full h-full object-center  hover:scale-105  duration-300 rounded-2xl "
              />
            </figure>

            {/* Content */}
            <div className="p-5">
              <h2 className="text-2xl font-bold text-gray-800 line-clamp-2">
                {product.title}
              </h2>

              <p className="text-xl font-semibold text-primary mt-2">
                ${product.price_min} - ${product.price_max}
              </p>

              <Link
                to={`/productDetails/${product._id}`}
                className="btn btn-outline btn-primary w-full mt-6 rounded-xl"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
};

export default AllProducts;