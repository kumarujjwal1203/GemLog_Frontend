import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/posts");
    }
  }, [token]);

  async function onFormRegister(e) {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    if (username.length < 3 || username.length > 30) {
      alert("Username must be between 3 and 30 characters");
      return;
    }

    try {
      const response = await axios.post(
        "https://gemlog-backend.onrender.com/user/register",
        {
          email,
          username,
          password,
        }
      );

      if (response.data.user) {
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("userEmail", response.data.user.email);
        localStorage.setItem("username", response.data.user.username);
        navigate("/login");
      }
    } catch (error) {
      alert("Registration failed.");
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-teal-100 via-blue-100 to-teal-100">
      {/* Left Illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-8">
        <img
          src="https://stories.freepiklabs.com/storage/53062/Privacy-Policy_Artboard-1.svg"
          alt="Register illustration"
          className="w-full max-w-md"
        />
      </div>

      {/* Right Form Section */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <form
          onSubmit={onFormRegister}
          className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Account
          </h2>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              maxLength={30}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-md transition duration-300"
          >
            Register
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-teal-600 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
