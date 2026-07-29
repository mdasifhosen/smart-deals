import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { signInWithGoogle,signOutUser, signInUser } = use(AuthContext);
  const navigate = useNavigate();
  const[show,setShow]=useState(false)
  const location = useLocation()
  const from=location.state?.pathname||"/"

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("click me");
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log({ email, password });

    signInUser(email, password)
      .then(async(result) => {
        if (!result.user.emailVerified) {
          toast.error("Please verify your email first.")
          await signOutUser()
          return
        }
      toast.success("login successful!");
      navigate(from,{replace:true});
    }).catch(error => {
        
        toast.error(error.message)
    })
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        toast.success("login successful!");
        navigate(from,{replace:true});
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-3xl text-center font-bold">Login now!</h1>
      <p className="text-center mt-2 ">
        Don't have an account?
        <Link
          className="text-blue-600 hover:underline visited:text-blue-600"
          to="/register"
        >
          Register Now
        </Link>
      </p>
      <div className="card-body">
        <form onSubmit={handleSignIn}>
          <fieldset className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />

            {/* password */}
             <div className="relative">
                         <label className="label">Password</label>
           
                         <input
                           type={show ? "text" : "password"}
                           name="password"
                           className="input w-full"
                           placeholder="Password"
                         />
           
                         <button
                           type="button"
                           onClick={() => setShow(!show)}
                           className="absolute right-4 top-7"
                         >
                           {show ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                         </button>
                       </div>
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
