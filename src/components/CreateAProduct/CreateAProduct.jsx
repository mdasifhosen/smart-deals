
import React from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/UseAuth";
import { data } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const CreateAProduct = () => {
    const { user } = useAuth()
    // const axiosInstance=useAxios()
    const axiosSecure=useAxiosSecure()
  const handleCreateAProduct = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const image = e.target.image.value;
    const price_min = e.target.price_min.value;
    const price_max = e.target.price_max.value;

    console.log(title, image, price_min, price_max);

      const newProduct = { title, image, price_min, price_max, email: user.email, seller_name: user.displayName };
      
      axiosSecure.post('/products', newProduct)
          .then(data => {
          console.log(data.data)
      })

//     axios
//       .post("http://localhost:3000/products", {
//         newProduct,
//       })
//       .then((data) => {
//         console.log(data.data);
//         if (data.data.insertedId) {
//           Swal.fire({
//             position: "top-center",
//             icon: "success",
//             title: "Your product has been created",
//             showConfirmButton: false,
//             timer: 1500,
//           });
//         }
//       });
  };
  return (
    <div className="lg:w-1/2 mx-auto mt-4">
      <form onSubmit={handleCreateAProduct}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="text" name="title" className="input w-full" />
          <label className="label">Image URL</label>
          <input
            type="text"
            name="image"
            className="input w-full"
            placeholder="image"
          />
          {/* bid amount */}
          <label className="label">Min Price</label>
          <input
            type="text"
            name="price_min"
            className="input w-full"
            placeholder="min Price"
          />
          <label className="label">Max Price</label>
          <input
            type="text"
            name="price_max"
            className="input w-full"
            placeholder="max Price"
          />

          <button className="btn btn-neutral mt-4">Add a Product</button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateAProduct;
