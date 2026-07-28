import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const MyBids = () => {
    const { user } = use(AuthContext)
    const[bids,setBids]=useState([])
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/bids?email=${user.email}`)
              .then((res) => res.json())
              .then((data) => {
                  console.log(data);
                  setBids(data)
              });
        }
    },[user?.email])
    return (
      <div>
        <h3>My Bids: {bids.length}</h3>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                 
                </th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {bids.map((bid, index) => (
                <tr key={bid._id}>
                  <th>
                   {index+1}
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Zemlak, Daniel and Leannon
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Desktop Support Technician
                    </span>
                  </td>
                  <td>Purple</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
          </table>
        </div>
      </div>
    );
};

export default MyBids;