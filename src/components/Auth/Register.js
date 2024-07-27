import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import bg2 from "../../pages/pics/bg2.png";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(register({ username, email, password }))
      .unwrap()
      .then(() => {
        toast.success("Registered Successfully.");
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(err.message || "Signup failed.");
      });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Registration failed.");
    }
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-gray-300">
      <div className="flex flex-col lg:flex-row justify-center gap-16 bg-gray-200 p-6 rounded shadow-md w-4/5 ">
      <div className="flex justify-center items-center flex-col">
          <img src={bg2} alt="" width={650} height={550} />
          <h3 className="text-zinc-700 text-sm font-semibold my-3">
            "Organize Your World with Precision and Clarity. Welcome to
            ImageManager."
          </h3>
        </div>        <form
          className="lg:w-2/5 w-full"
          onSubmit={registerHandler}
        >
          <h1 className="text-2xl font-bold mb-4 text-center">Register to <span className="text-green-700">ImageManager</span></h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-500"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <h3 className="my-4">
            If you already have an account, login using the <Link className="text-blue-500 underline hover:opacity-75" to="/login">Login</Link>
          </h3>
        </form>
      </div>
    </div>
  );
};

export default Register;
