import React, { Suspense, useState } from 'react';
import LatestProducts from '../LatestProducts/LatestProducts';

const latestProductsPromise = fetch("http://localhost:3000/latest-products").then(res=>res.json())

const Home = () => { 
    return (
      <div>
        <header>
          <div>
            <h1 className="text-6xl font-bold mt-[70px] text-center">
              Deal your Products <br /> in a Smart way !
            </h1>
            <p className="text-center mt-4 text-[20px]">
              SmartDeals helps you sell, resell, and shop from trusted local
              sellers — all in one place!
            </p>
            <div className="flex justify-center my-8">
              <div className="join w-full max-w-lg">
                <input
                  type="text"
    
                  placeholder="Search product..."
                  placeholder="Search by product name..."
                  className="input input-bordered join-item w-full"
                />
                <button
                  
                  className="btn btn-primary join-item"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="w-full flex justify-center items-center gap-5 mt-8">
              <button className="btn btn-active btn-primary w-[156px] mr-3">
                Watch All Products
              </button>
              <button className="btn btn-active btn-primary w-[156px]">
                Post an Product
              </button>
            </div>
          </div>
        </header>
        <div>
          <Suspense
            fallback={
              <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-bars loading-xl flex justify-center items-center"></span>
              </div>
            }
          >
            <LatestProducts
              latestProductsPromise={latestProductsPromise}
            ></LatestProducts>
          </Suspense>
        </div>
      </div>
    );
};

export default Home;