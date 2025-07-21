import { useState, useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import useCommentTree from "../hooks/useCommentTree";

export default function CommentsList({ postId }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const currentUserId = localStorage.getItem("userId");

  const { comments, setAllComments, addReply, updateComment, deleteComment } =
    useCommentTree([]);

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [postId]);

  const fetchComments = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://gemlog-backend.onrender.com/comments/post/${postId}`
      );
      setAllComments(response.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCommentAdded = (newComment) => {
    setAllComments([newComment, ...comments]);
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900">
          Comments ({comments.length})
        </h2>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin h-8 w-8 border-4 border-teal-500 border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="p-6 text-center text-red-600">
          <p>{error}</p>
          <button
            onClick={fetchComments}
            className="mt-3 text-sm text-teal-600 hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Main Comment Area */}
      {!loading && !error && (
        <>
          <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />

          <div className="p-6">
            {comments.length === 0 ? (
              <div className="text-center text-gray-500 py-6">
                No comments yet. Be the first to comment!
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    onUpdate={updateComment}
                    onDelete={deleteComment}
                    onReply={addReply}
                    currentUserId={currentUserId}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
