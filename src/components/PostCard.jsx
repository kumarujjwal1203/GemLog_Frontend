import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function PostCard({ post, onDelete, onLike, onUnlike }) {
  const [liking, setLiking] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");
  const isAuthor = currentUserId === post.userId?._id;
  const isLiked = post.likes?.includes(currentUserId) || false;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const handleLike = async () => {
    if (!token) return alert("Please login to like posts");
    setLiking(true);
    try {
      const url = `https://gemlog-backend.onrender.com/posts/${post._id}/${
        isLiked ? "unlike" : "like"
      }`;
      await axios.post(
        url,
        {},
        { headers: { Authorization: "Bearer " + token } }
      );
      isLiked ? onUnlike(post._id) : onLike(post._id);
    } catch {
      alert("Failed to like/unlike post. Please try again.");
    } finally {
      setLiking(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setDeleting(true);
    try {
      await axios.delete(
        `https://gemlog-backend.onrender.com/posts/${post._id}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      onDelete(post._id);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to delete post. Please try again."
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/posts/${post._id}`;
    try {
      await navigator.clipboard.writeText(url);
      alert("Post link copied to clipboard!");
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("Post link copied to clipboard!");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="p-5 md:p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            {post.userId?.profilePicture ? (
              <img
                src={`https://gemlog-backend.onrender.com${post.userId.profilePicture}`}
                alt={post.userId.username}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                {post.userId?.username?.charAt(0).toUpperCase() || "A"}
              </div>
            )}
            <div>
              <Link
                to={`/user/${post.userId?._id}`}
                className="text-sm font-semibold text-gray-800 hover:text-teal-600"
              >
                @{post.userId?.username || "Anonymous"}
              </Link>
              <p className="text-xs text-gray-500">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleLike}
              disabled={liking}
              className={`flex items-center gap-1 px-3 py-1 text-sm rounded-full transition ${
                isLiked
                  ? "bg-pink-100 text-pink-600 hover:bg-pink-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              } disabled:opacity-50`}
            >
              {isLiked ? "❤️" : "🤍"} {post.likes?.length || 0}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200"
            >
              📤 Share
            </button>
            {isAuthor && (
              <>
                <Link
                  to={`/posts/${post._id}/edit`}
                  className="text-sm text-teal-600 hover:text-teal-800"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <Link to={`/posts/${post._id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-teal-600 mb-2 line-clamp-1">
            {post.title}
          </h3>
          <p className="text-gray-700 text-sm line-clamp-3">{post.content}</p>
        </Link>

        {/* Images */}
        {post.images?.length > 0 && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {post.images.slice(0, 3).map((image, idx) => (
              <img
                key={idx}
                src={`https://gemlog-backend.onrender.com${image}`}
                alt={`Post image ${idx + 1}`}
                className="w-full h-40 object-cover rounded-lg"
              />
            ))}
            {post.images.length > 3 && (
              <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded-lg">
                <span className="text-gray-500 text-sm">
                  +{post.images.length - 3} more
                </span>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-200 text-sm text-gray-500">
          <div className="flex gap-4">
            <span>{post.likes?.length || 0} likes</span>
            <span>{post.commentCount || 0} comments</span>
          </div>
          <Link
            to={`/posts/${post._id}`}
            className="text-teal-600 hover:text-teal-800 font-medium"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
}
