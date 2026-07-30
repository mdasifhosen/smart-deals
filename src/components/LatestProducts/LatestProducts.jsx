import React, { use } from 'react';
import Product from '../Product/Product';

const LatestProducts = ({ latestProductsPromise }) =>{
    const products = use(latestProductsPromise);
    // console.log(products)


    return (
      <div>
        <h2 className="text-5xl font-bold text-center mt-20 mb-10">
          Recent <span className="text-primary">Products</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 m-5">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      </div>
      
 
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    //   {products.map((product) => (
    //     <div key={product._id}>
    //       <img src={product.image} alt={product.title} />
    //       <h2>{product.title}</h2>
    //     </div>
    //   ))}
    // </div>
  );
};



export default LatestProducts;