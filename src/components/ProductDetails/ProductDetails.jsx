import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const {
    title,
    price_min,
    price_max,
    _id:productId,
    email,
    image,
    location,
    condition,
    usage,
    created_at,
    seller_contact,
    description,
    seller_name,
      seller_image,
    
  } = useLoaderData();
  const { user} = use(AuthContext);
    const bidModalRef = useRef(null);
    const [bids,setBids]=useState([])
    
    useEffect(() => {
        fetch(`http://localhost:3000/products/bids/${productId}`)
          .then((res) => res.json())
          .then((data) => {
              console.log("bid form this products", data);
              setBids(data)
          });
    },[productId])

  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
      e.preventDefault();
      const name = e.target.name.value
      const email = e.target.email.value
      const bid = e.target.bid.value
      console.log(productId, name, email, bid)
      
      const newBid = {
          product: productId,
          buyer_name: name,
          buyer_email: email,
          buyer_image:user?.photoURL,
          bid_price: bid,
          status:"pending"
      }

      fetch("http://localhost:3000/bids", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newBid),
      })
        .then((res) => res.json())
        .then((data) => {
            if (data.insertedId) {
                bidModalRef.current.close()
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: "Your bid has been placed",
                  showConfirmButton: false,
                  timer: 1500,
                });

                // add to the new bids add
                newBid._id = data.insertedId
                const newBids = [...bids, newBid]
                newBids.sort((a,b)=>b.bid_price-a.bid_price)
                setBids(newBids)
          }
        });

  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side */}
        <div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src={image}
              alt={``}
              className="w-full h-72 md:h-96 lg:h-[500px] object-cover"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-lg mt-6 p-6">
            <h2 className="text-2xl font-bold mb-4">Product Description</h2>

            <div className="flex flex-col sm:flex-row sm:justify-between border-b pb-3 mb-4 gap-2">
              <p>
                <span className="font-semibold text-purple-600">
                  Condition :
                </span>
                {condition}
              </p>

              <p>
                <span className="font-semibold text-purple-600">
                  Usage Time :
                </span>
                {usage}
              </p>
            </div>

            <p className="text-gray-600 leading-7">{description}</p>
          </div>
        </div>

        {/* Right Side */}
        <div>
          <Link to="/" className="text-sm hover:text-purple-600">
            ← Back To Products
          </Link>

          <div className="mt-3">
            <p className="text-3xl lg:text-5xl font-bold mt-4 leading-tight">
              {title}
            </p>
          </div>

          <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full">
            Art and Hobbies
          </span>

          {/* Price */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
            <h2 className="text-3xl font-bold text-green-600">
              ${price_min} - ${price_max}
            </h2>

            <p className="text-gray-500 mt-2">Price starts from</p>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
            <h2 className="text-xl font-bold mb-4">Product Details</h2>

            <div className="space-y-3 text-gray-600">
              <p>
                <span className="font-semibold">Product ID :</span> {productId}
              </p>

              <p>
                <span className="font-semibold">Posted :</span> {created_at}
              </p>
            </div>
          </div>

          {/* Seller */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
            <h2 className="text-xl font-bold mb-5">Seller Information</h2>

            <div className="flex items-center gap-4">
              <img
                src={seller_image}
                alt=""
                className="w-16 h-16 rounded-full object-cover"
              />

              <div>
                <h3 className="font-bold text-lg">{seller_name}</h3>

                <p className="text-sm text-gray-500">{email}</p>
              </div>
            </div>

            <div className="mt-5 space-y-2 text-gray-600">
              <p>
                <span className="font-semibold">Location :</span> {location}
              </p>

              <p>
                <span className="font-semibold">Contact :</span>{" "}
                {seller_contact}
              </p>

              <p>
                <span className="font-semibold">Status :</span>

                <span className="ml-2 bg-yellow-400 px-2 py-1 rounded text-xs">
                  On Sale
                </span>
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={handleBidModalOpen}
              className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:opacity-90"
            >
              I Want Buy This Product
            </button>
            <dialog
              ref={bidModalRef}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-3xl text-center">
                  Give Seller Your Offered Price
                </h3>
                <form onSubmit={handleBidSubmit}>
                  <fieldset className="fieldset">
                    <label className="label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="input w-full"
                      readOnly
                      defaultValue={user?.displayName}
                    />
                    <label className="label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="input w-full"
                      readOnly
                      defaultValue={user?.email}
                    />
                    {/* bid amount */}
                    <label className="label">Bid Price</label>
                    <input
                      type="text"
                      name="bid"
                      className="input w-full"
                      placeholder="Price"
                    />
                    {/* <Link to={`/productDetails/${_id}`} className="btn btn-primary">Cancel</Link> */}
                    <button className="btn btn-neutral mt-4">Submit Bid</button>
                  </fieldset>
                </form>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Cancel</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
      {/* ================== BIDS SECTION ================== */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6">
          Bids For This Product :
          <span className="text-purple-600 ml-2">{bids.length}</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bids.map((bid, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={bid?.buyer_image}
                            alt="my image"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{bid.buyer_email}</td>
                  <td>{bid.bid_price}</td>
                  <th>
                    <button className="btn btn-primary btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
