import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const MyProducts = () => {
    const [bids, setBids] = useState([])
    const {user}=use(AuthContext)
    useEffect(() => {
      fetch(`http://localhost:3000/my-products-bids?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setBids(data));
    }, [user]);
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
          My Product Bids ({bids.length})
        </h1>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Buyer</th>
                <th>Bid Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bids.map((bid, index) => (
                <tr key={bid._id}>
                  <th>{index + 1}</th>

                  {/* Product */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-14 h-14 rounded">
                          <img
                            src={bid.product_image}
                            alt={bid.product_title}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="font-bold">{bid.product_title}</div>
                      </div>
                    </div>
                  </td>

                  {/* Buyer */}
                  <td>
                    <div className="font-bold">{bid.buyer_name}</div>

                    <div className="text-sm text-gray-500">
                      {bid.buyer_email}
                    </div>
                  </td>

                  {/* Price */}
                  <td className="font-semibold text-green-600">
                    ${bid.bid_price}
                  </td>

                  {/* Status */}
                  <td>
                    {bid.status === "pending" ? (
                      <span className="badge badge-warning">Pending</span>
                    ) : (
                      <span className="badge badge-success">Accepted</span>
                    )}
                  </td>

                  {/* Action */}
                  <td>
                    <button className="btn btn-success btn-sm">Accept</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default MyProducts;