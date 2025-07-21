import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function onFormLogin(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post(
        "https://gemlog-backend.onrender.com/user/login",
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("userEmail", response.data.user.email);
        localStorage.setItem("username", response.data.user.username);
        navigate("/posts");
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-purple-200 via-blue-100 to-teal-200">
      {/* Left Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-8">
        <img
          src="https://stories.freepiklabs.com/storage/53062/Privacy-Policy_Artboard-1.svg"
          alt="Login illustration"
          className="w-full max-w-md"
        />
      </div>

      {/* Right Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <form
          onSubmit={onFormLogin}
          className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Sign In
          </h2>

          <div className="space-y-4">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />

            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-md transition duration-300"
          >
            {submitting ? "Logging in..." : "Login"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/" className="text-teal-600 hover:underline">
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
