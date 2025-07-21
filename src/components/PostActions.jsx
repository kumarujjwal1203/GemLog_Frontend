// import { useState } from "react";
// import axios from "axios";

// export default function PostActions({ post, onLike, onUnlike, onDislike, onUndislike }) {
//   const [liking, setLiking] = useState(false);
//   const [disliking, setDisliking] = useState(false);
//   const token = localStorage.getItem("token");
//   const currentUserId = localStorage.getItem("userId");
//   const isLiked = post.likes?.includes(currentUserId) || false;
//   const isDisliked = post.dislikes?.includes(currentUserId) || false;

//   const handleLike = async () => {
//     if (!token) {
//       alert("Please login to interact with posts");
//       return;
//     }
//     setLiking(true);
//     try {
//       const endpoint = isLiked ? "unlike" : "like";
//       await axios.post(
//         `https://gemlog-backend.onrender.com/posts/${post._id}/${endpoint}`,
//         {},
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );
//       if (isLiked) {
//         onUnlike && onUnlike();
//       } else {
//         onLike && onLike();
//       }
//     } catch (err) {
//       alert("Failed to like/unlike post. Please try again.");
//     } finally {
//       setLiking(false);
//     }
//   };

//   const handleDislike = async () => {
//     if (!token) {
//       alert("Please login to interact with posts");
//       return;
//     }
//     setDisliking(true);
//     try {
//       const endpoint = isDisliked ? "undislike" : "dislike";
//       await axios.post(
//         `http://localhost:3002/posts/${post._id}/${endpoint}`,
//         {},
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );
//       if (isDisliked) {
//         onUndislike && onUndislike();
//       } else {
//         onDislike && onDislike();
//       }
//     } catch (err) {
//       alert("Failed to dislike/undislike post. Please try again.");
//     } finally {
//       setDisliking(false);
//     }
//   };

//   return (
//     <div className="flex items-center space-x-4">
//       <button
//         onClick={handleLike}
//         disabled={liking}
//         className={`flex items-center space-x-1 px-3 py-1 rounded transition-colors ${
//           isLiked
//             ? "bg-green-100 text-green-600 hover:bg-green-200"
//             : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//         } disabled:opacity-50`}
//       >
//         <span className="text-lg">{isLiked ? "👍" : "👍"}</span>
//         <span className="text-sm font-medium">
//           {isLiked ? "Liked" : "Like"} ({post.likes?.length || 0})
//         </span>
//       </button>

//       <button
//         onClick={handleDislike}
//         disabled={disliking}
//         className={`flex items-center space-x-1 px-3 py-1 rounded transition-colors ${
//           isDisliked
//             ? "bg-red-100 text-red-600 hover:bg-red-200"
//             : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//         } disabled:opacity-50`}
//       >
//         <span className="text-lg">{isDisliked ? "👎" : "👎"}</span>
//         <span className="text-sm font-medium">
//           {isDisliked ? "Disliked" : "Dislike"} ({post.dislikes?.length || 0})
//         </span>
//       </button>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";

export default function PostActions({
  post,
  onLike,
  onUnlike,
  onDislike,
  onUndislike,
}) {
  const [liking, setLiking] = useState(false);
  const [disliking, setDisliking] = useState(false);
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");
  const isLiked = post.likes?.includes(currentUserId) || false;
  const isDisliked = post.dislikes?.includes(currentUserId) || false;

  const handleLike = async () => {
    if (!token) {
      alert("Please login to interact with posts");
      return;
    }
    setLiking(true);
    try {
      const endpoint = isLiked ? "unlike" : "like";
      await axios.post(
        `https://gemlog-backend.onrender.com/posts/${post._id}/${endpoint}`,
        {},
        { headers: { Authorization: "Bearer " + token } }
      );
      isLiked ? onUnlike?.() : onLike?.();
    } catch (err) {
      alert("Failed to like/unlike post. Please try again.");
    } finally {
      setLiking(false);
    }
  };

  const handleDislike = async () => {
    if (!token) {
      alert("Please login to interact with posts");
      return;
    }
    setDisliking(true);
    try {
      const endpoint = isDisliked ? "undislike" : "dislike";
      await axios.post(
        `https://gemlog-backend.onrender.com/posts/${post._id}/${endpoint}`,
        {},
        { headers: { Authorization: "Bearer " + token } }
      );
      isDisliked ? onUndislike?.() : onDislike?.();
    } catch (err) {
      alert("Failed to dislike/undislike post. Please try again.");
    } finally {
      setDisliking(false);
    }
  };

  return (
    <div className="flex items-center gap-4 mt-4">
      {/* Like Button */}
      <button
        onClick={handleLike}
        disabled={liking}
        className={`flex items-center gap-2 px-5 py-2 rounded-lg shadow-md font-semibold transition-all duration-200
          ${
            isLiked
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-100 text-gray-700 hover:bg-green-100"
          } 
          disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <span className="text-xl">👍</span>
        <span>
          {isLiked ? "Liked" : "Like"} ({post.likes?.length || 0})
        </span>
      </button>

      {/* Dislike Button */}
      <button
        onClick={handleDislike}
        disabled={disliking}
        className={`flex items-center gap-2 px-5 py-2 rounded-lg shadow-md font-semibold transition-all duration-200
          ${
            isDisliked
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-100 text-gray-700 hover:bg-red-100"
          } 
          disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <span className="text-xl">👎</span>
        <span>
          {isDisliked ? "Disliked" : "Dislike"} ({post.dislikes?.length || 0})
        </span>
      </button>
    </div>
  );
}
