import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserCard({ user, onFollowChange }) {
  const [followLoading, setFollowLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");

  // Initialize follow state based on user data
  useEffect(() => {
    if (user.isFollowing !== undefined) {
      setIsFollowing(user.isFollowing);
    }
  }, [user.isFollowing]);

  const handleFollow = async () => {
    if (!token) {
      alert("Please login to follow users");
      return;
    }

    if (user._id === currentUserId) {
      alert("You cannot follow yourself");
      return;
    }

    setFollowLoading(true);
    try {
      if (isFollowing) {
        await axios.post(
          `https://gemlog-backend.onrender.com/user/unfollow/${user._id}`,
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setIsFollowing(false);
      } else {
        await axios.post(
          `https://gemlog-backend.onrender.com/user/follow/${user._id}`,
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setIsFollowing(true);
      }

      if (onFollowChange) {
        onFollowChange(user._id, !isFollowing);
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
      alert(error.response?.data?.message || "Failed to follow/unfollow user");
    } finally {
      setFollowLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-medium">
          {user.profilePicture ? (
            <img
              src={`https://gemlog-backend.onrender.com${user.profilePicture}`}
              alt={user.username}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            user.username?.charAt(0).toUpperCase() || "U"
          )}
        </div>
        <div>
          <Link
            to={`/user/${user._id}`}
            className="font-medium text-gray-900 hover:text-teal-600 transition-colors"
          >
            @{user.username}
          </Link>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {user._id !== currentUserId && token && (
        <button
          onClick={handleFollow}
          disabled={followLoading}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isFollowing
              ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
              : "bg-teal-600 text-white hover:bg-teal-700"
          } disabled:opacity-50`}
        >
          {followLoading ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
}
