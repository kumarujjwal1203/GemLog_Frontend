// import { useState } from "react";
// import axios from "axios";
// import PropTypes from "prop-types";
// import ReplyForm from "./ReplyForm";
// import CommentActions from "./CommentActions";

// export default function Comment({
//   comment,
//   isReply = false,
//   onUpdate,
//   onDelete,
//   onReply,
//   currentUserId
// }) {
//   const [editing, setEditing] = useState(false);
//   const [editContent, setEditContent] = useState(comment.content);
//   const [replying, setReplying] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");
//   const isCommentAuthor = currentUserId === comment.userId?._id;

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const handleEdit = () => {
//     setEditContent(comment.content);
//     setEditing(true);
//   };

//   const handleUpdate = async () => {
//     if (!editContent.trim()) return;
//     console.log("Attempting to update comment:", comment._id, "with content:", editContent.trim());
//     setLoading(true);
//     try {
//       const response = await axios.put(
//         `https://gemlog-backend.onrender.com/comments/${comment._id}`,
//         { content: editContent.trim() },
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );
//       console.log("Update response:", response.data);
//       onUpdate(comment._id, response.data);
//       setEditing(false);
//     } catch (err) {
//       console.error("Error updating comment:", err);
//       console.error("Error response:", err.response?.data);
//       const errorMessage = err.response?.data?.message || "Failed to update comment. Please try again.";
//       alert(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!confirm("Are you sure you want to delete this comment? This will also delete all replies to this comment.")) return;
//     setLoading(true);
//     try {
//       await axios.delete(`https://gemlog-backend.onrender.com/comments/${comment._id}`, {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       });
//       onDelete(comment._id);
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || "Failed to delete comment. Please try again.";
//       alert(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReply = () => {
//     setReplying(true);
//   };

//   const handleSubmitReply = async (replyContent) => {
//     if (!replyContent.trim()) return;
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `https://gemlog-backend.onrender.com/comments/${comment._id}/reply`,
//         { content: replyContent.trim() },
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );
//       onReply(comment._id, response.data);
//       setReplying(false);
//     } catch (err) {
//       alert("Failed to post reply. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={`border-b border-gray-100 pb-4 last:border-b-0 ${isReply ? 'ml-8 border-l-2 border-gray-200 pl-4' : ''}`}>
//       <div className="flex items-start space-x-3">
//         <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
//           {comment.userId?.username?.charAt(0).toUpperCase() || "A"}
//         </div>
//         <div className="flex-1">
//           <div className="flex items-center space-x-2 mb-1">
//             <span className="font-medium text-gray-900">
//               @{comment.userId?.username || "Anonymous"}
//             </span>
//             <span className="text-xs text-gray-500">
//               {formatDate(comment.createdAt)}
//             </span>
//             {isReply && (
//               <span className="text-xs text-gray-400">• reply</span>
//             )}
//           </div>
//           {editing ? (
//             <div className="space-y-2">
//               <textarea
//                 value={editContent}
//                 onChange={(e) => setEditContent(e.target.value)}
//                 rows={2}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 maxLength={500}
//               />
//               <div className="flex space-x-2">
//                 <button
//                   onClick={handleUpdate}
//                   disabled={loading}
//                   className="text-blue-600 hover:text-blue-800 text-sm disabled:opacity-50"
//                 >
//                   {loading ? "Saving..." : "Save"}
//                 </button>
//                 <button
//                   onClick={() => setEditing(false)}
//                   className="text-gray-600 hover:text-gray-800 text-sm"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <p className="text-gray-700">{comment.content}</p>
//           )}
//           {!comment.isDeleted && (
//             <CommentActions
//               canEdit={isCommentAuthor}
//               canDelete={isCommentAuthor}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//               onReply={handleReply}
//               showReply={!!token}
//               isEditing={editing}
//               isLoading={loading}
//             />
//           )}
//           {replying && (
//             <ReplyForm
//               onSubmit={handleSubmitReply}
//               onCancel={() => setReplying(false)}
//               loading={loading}
//             />
//           )}
//           {comment.replies && comment.replies.length > 0 && (
//             <div className="mt-3 space-y-2">
//               {comment.replies.map((reply, index) => (
//                 <Comment
//                   key={reply._id || `reply-${comment._id}-${index}`}
//                   comment={reply}
//                   isReply={true}
//                   onUpdate={onUpdate}
//                   onDelete={onDelete}
//                   onReply={onReply}
//                   currentUserId={currentUserId}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// Comment.propTypes = {
//   comment: PropTypes.object.isRequired,
//   isReply: PropTypes.bool,
//   onUpdate: PropTypes.func.isRequired,
//   onDelete: PropTypes.func.isRequired,
//   onReply: PropTypes.func.isRequired,
//   currentUserId: PropTypes.string,
// };

import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import ReplyForm from "./ReplyForm";
import CommentActions from "./CommentActions";

export default function Comment({
  comment,
  isReply = false,
  onUpdate,
  onDelete,
  onReply,
  currentUserId,
}) {
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [replying, setReplying] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const isCommentAuthor = currentUserId === comment.userId?._id;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const handleEdit = () => {
    setEditContent(comment.content);
    setEditing(true);
  };

  const handleUpdate = async () => {
    if (!editContent.trim()) return;
    setLoading(true);
    try {
      const response = await axios.put(
        `https://gemlog-backend.onrender.com/comments/${comment._id}`,
        { content: editContent.trim() },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      onUpdate(comment._id, response.data);
      setEditing(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update comment.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this comment and all replies?")) return;
    setLoading(true);
    try {
      await axios.delete(
        `https://gemlog-backend.onrender.com/comments/${comment._id}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      onDelete(comment._id);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete comment.");
    } finally {
      setLoading(false);
    }
  };

  const handleReply = () => setReplying(true);

  const handleSubmitReply = async (replyContent) => {
    if (!replyContent.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `https://gemlog-backend.onrender.com/comments/${comment._id}/reply`,
        { content: replyContent.trim() },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      onReply(comment._id, response.data);
      setReplying(false);
    } catch (err) {
      alert("Failed to post reply. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`p-4 bg-white rounded-xl shadow-md mb-4 ${
        isReply ? "ml-6 border-l-4 border-teal-200" : ""
      }`}
    >
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {comment.userId?.username?.charAt(0).toUpperCase() || "U"}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <span className="font-semibold text-gray-800">
              @{comment.userId?.username || "Anonymous"}
            </span>
            <span className="text-xs">• {formatDate(comment.createdAt)}</span>
            {isReply && <span className="text-xs">• reply</span>}
          </div>

          {editing ? (
            <div className="space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={2}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                maxLength={500}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="text-teal-600 hover:text-teal-800 text-sm"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700">{comment.content}</p>
          )}

          {/* Action Buttons */}
          {!comment.isDeleted && (
            <CommentActions
              canEdit={isCommentAuthor}
              canDelete={isCommentAuthor}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onReply={handleReply}
              showReply={!!token}
              isEditing={editing}
              isLoading={loading}
            />
          )}

          {/* Reply Form */}
          {replying && (
            <ReplyForm
              onSubmit={handleSubmitReply}
              onCancel={() => setReplying(false)}
              loading={loading}
            />
          )}

          {/* Nested Replies */}
          {comment.replies?.length > 0 && (
            <div className="mt-4 space-y-3">
              {comment.replies.map((reply, index) => (
                <Comment
                  key={reply._id || `reply-${comment._id}-${index}`}
                  comment={reply}
                  isReply={true}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onReply={onReply}
                  currentUserId={currentUserId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  isReply: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
  currentUserId: PropTypes.string,
};
