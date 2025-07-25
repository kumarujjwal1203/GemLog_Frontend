import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const navigate = useNavigate();

  const handleContentChange = (e) => {
    const value = e.target.value;
    setContent(value);
    setCharCount(value.length);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).filter((f) =>
      f.type.startsWith("image/")
    );

    if (files.length + selectedFiles.length > 5) {
      setError("Max 5 images allowed.");
      return;
    }

    setSelectedFiles((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const url = URL.createObjectURL(file);
      setPreviewUrls((prev) => [...prev, url]);
    });
    setError("");
  };

  const removeImage = (i) => {
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== i));
    setPreviewUrls((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("content", content.trim());
      selectedFiles.forEach((file) => formData.append("images", file));

      await axios.post("https://gemlog-backend.onrender.com/posts", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/posts");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white border rounded-xl shadow-sm">
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Create New Post
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Share your thoughts with the community
            </p>
          </div>
          <Link
            to="/posts"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 transition-colors"
              placeholder="Enter your post title..."
            />
            <p className="text-xs text-gray-500 mt-1">
              {title.length}/100 characters
            </p>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images (optional)
            </label>
            <div className="relative">
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-400 transition-colors">
                <svg
                  className="mx-auto h-10 w-10 text-gray-400 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V7a4 4 0 014-4h2a4 4 0 014 4v9m-3-3l-3 3m0 0l-3-3m3 3V9"
                  />
                </svg>
                <p className="text-gray-600">
                  Click or drag to upload (PNG, JPG, GIF – max 5 images)
                </p>
              </div>
            </div>

            {previewUrls.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Previews:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {previewUrls.map((url, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={url}
                        alt={`preview-${idx}`}
                        className="w-full h-28 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Content *
            </label>
            <textarea
              id="content"
              rows={10}
              value={content}
              onChange={handleContentChange}
              maxLength={5000}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 transition-colors resize-vertical"
              placeholder="Write your post content here..."
            />
            <div className="flex justify-between mt-2">
              <p className="text-xs text-gray-500">{charCount}/5000</p>
              {charCount > 0 && (
                <p className="text-xs text-gray-500">
                  ~{Math.ceil(charCount / 200)} min read
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <Link
              to="/posts"
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading || !title.trim() || !content.trim()}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                loading || !title.trim() || !content.trim()
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700 text-white"
              }`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full"></div>
                  <span>Publishing...</span>
                </div>
              ) : (
                "Publish Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
