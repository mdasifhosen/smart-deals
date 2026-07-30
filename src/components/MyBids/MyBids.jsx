import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyBids = () => {
    const { user } = use(AuthContext)
  const [bids, setBids] = useState([])
  const axiosSecure=useAxiosSecure()


  useEffect(() => {
    axiosSecure.get(`/bids?email=${user.email}`)
      .then(data => {
      setBids(data.data)
    })
  },[user,axiosSecure])
  
 
    // useEffect(() => {
    //     if (user?.email) {
    //       fetch(`http://localhost:3000/bids?email=${user.email}`, {
    //         headers: {
    //             authorization:`Bearer ${localStorage.getItem('token')}`
    //           }
    //         })
    //           .then((res) => res.json())
    //           .then((data) => {
    //               console.log(data);
    //               setBids(data)
    //           });
    //     }
    // }, [user])
    // useEffect(() => {
    //     if (user?.email) {
    //       fetch(`http://localhost:3000/bids?email=${user.email}`, {
    //         headers: {
    //             authorization:`Bearer ${user.accessToken}`
    //           }
    //         })
    //           .then((res) => res.json())
    //           .then((data) => {
    //               console.log(data);
    //               setBids(data)
    //           });
    //     }
    // }, [user])
  
  const handleDeleteBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        fetch(`http://localhost:3000/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Bids has been deleted.",
                icon: "success",
              });

              const remainingBids = bids.filter(bid => bid._id !== _id)
              setBids(remainingBids)
            }
          });
        
    });
  }
    return (
      // <div className='w-full px-2 md:px-6'>
      //   <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold m-6 text-center">
      //     MyBids: {bids.length}
      //   </h1>
      //   <div className="overflow-x-auto rounded-xl shadow-lg">
      //     <table className="table table-zebra min-w-[800px]">
      //       {/* head */}
      //       <thead>
      //         <tr>
      //           <th>#</th>

      //           <th>Product</th>
      //           <th>Seller</th>
      //           <th>Bid Price</th>
      //           <th>Status</th>
      //           <th>Actions</th>
      //         </tr>
      //       </thead>
      //       <tbody>
      //         {/* row 1 */}

      //         {bids.map((bid, index) => (
      //           <tr key={bid._id}>
      //             <td>{index + 1}</td>
      //             <td>
      //               <div className="flex items-center gap-3">
      //                 <div className="avatar">
      //                   <div className="mask mask-squircle h-12 w-12">
      //                     <img
      //                       src="https://img.daisyui.com/images/profile/demo/2@94.webp"
      //                       alt="Avatar Tailwind CSS Component"
      //                     />
      //                   </div>
      //                 </div>
      //                 <div>
      //                   <div className="font-bold">Hart Hagerty</div>
      //                   <div className="text-sm opacity-50">United States</div>
      //                 </div>
      //               </div>
      //             </td>
      //             <td>
      //               Zemlak, Daniel and Leannon
      //               <br />
      //               <span className="badge badge-ghost badge-sm">
      //                 Desktop Support Technician
      //               </span>
      //             </td>
      //             <td>{bid.bid_price}</td>
      //             <td>
      //               {bid.status === "pending" ? (
      //                 <div className="badge badge-warning">{bid.status}</div>
      //               ) : (
      //                 <div className="badge badge-success">{bid.status}</div>
      //               )}
      //             </td>
      //             <th>
      //               <button
      //                 onClick={() => handleDeleteBid(bid._id)}
      //                 className="btn btn-outline btn-xs"
      //               >
      //                 Remove Bid
      //               </button>
      //             </th>
      //           </tr>
      //         ))}
      //       </tbody>
      //       {/* foot */}
      //     </table>
      //   </div>
      // </div>

      <div className="w-full px-2 md:px-6">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold my-6 text-center">
          My Bids: {bids.length}
        </h1>

        <table className="table w-full">
          {/* Table Head */}
          <thead className="hidden md:table-header-group">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Seller</th>
              <th>Bid Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {bids.map((bid, index) => (
              <tr
                key={bid._id}
                className="block md:table-row border rounded-xl mb-4 p-4 md:border-0 md:p-0 shadow md:shadow-none"
              >
                {/* Serial */}
                <td className="block md:table-cell py-2">
                  <span className="font-bold md:hidden"># : </span>
                  {index + 1}
                </td>

                {/* Product */}
                <td className="block md:table-cell py-2">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Product"
                        />
                      </div>
                    </div>

                    <div>
                      <span className="font-bold md:hidden">Product : </span>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>

                {/* Seller */}
                <td className="block md:table-cell py-2">
                  <span className="font-bold md:hidden">Seller : </span>
                  Zemlak, Daniel and Leannon
                  <br />
                  <span className="badge badge-ghost badge-sm mt-1">
                    Desktop Support Technician
                  </span>
                </td>

                {/* Bid Price */}
                <td className="block md:table-cell py-2">
                  <span className="font-bold md:hidden">Bid Price : </span>
                  {bid.bid_price}
                </td>

                {/* Status */}
                <td className="block md:table-cell py-2">
                  <span className="font-bold md:hidden">Status : </span>

                  {bid.status === "pending" ? (
                    <div className="badge badge-warning">{bid.status}</div>
                  ) : (
                    <div className="badge badge-success">{bid.status}</div>
                  )}
                </td>

                {/* Action */}
                <td className="block md:table-cell py-2">
                  <button
                    onClick={() => handleDeleteBid(bid._id)}
                    className="btn btn-outline btn-error btn-sm"
                  >
                    Remove Bid
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default MyBids;