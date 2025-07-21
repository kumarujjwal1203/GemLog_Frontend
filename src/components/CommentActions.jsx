// import PropTypes from "prop-types";

// export default function CommentActions({
//   canEdit,
//   canDelete,
//   onEdit,
//   onDelete,
//   onReply,
//   showReply,
//   isEditing,
//   isLoading
// }) {
//   return (
//     <div className="flex space-x-2 mt-2">
//       {showReply && (
//         <button
//           onClick={onReply}
//           className="text-blue-600 hover:text-blue-800 transition-colors text-xs"
//         >
//           Reply
//         </button>
//       )}
//       {canEdit && !isEditing && (
//         <button
//           onClick={onEdit}
//           className="text-blue-600 hover:text-blue-800 transition-colors text-xs"
//         >
//           Edit
//         </button>
//       )}
//       {canDelete && !isEditing && (
//         <button
//           onClick={onDelete}
//           className="text-red-600 hover:text-red-800 transition-colors text-xs"
//           disabled={isLoading}
//         >
//           Delete
//         </button>
//       )}
//     </div>
//   );
// }

// CommentActions.propTypes = {
//   canEdit: PropTypes.bool,
//   canDelete: PropTypes.bool,
//   onEdit: PropTypes.func,
//   onDelete: PropTypes.func,
//   onReply: PropTypes.func,
//   showReply: PropTypes.bool,
//   isEditing: PropTypes.bool,
//   isLoading: PropTypes.bool,
// };

import PropTypes from "prop-types";

export default function CommentActions({
  canEdit,
  canDelete,
  onEdit,
  onDelete,
  onReply,
  showReply,
  isEditing,
  isLoading,
}) {
  return (
    <div className="flex space-x-2 mt-2">
      {showReply && (
        <button
          onClick={onReply}
          className="px-2 py-1 text-xs rounded-md text-white bg-teal-500 hover:bg-teal-600 transition-colors"
        >
          Reply
        </button>
      )}
      {canEdit && !isEditing && (
        <button
          onClick={onEdit}
          className="px-2 py-1 text-xs rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition-colors"
        >
          Edit
        </button>
      )}
      {canDelete && !isEditing && (
        <button
          onClick={onDelete}
          disabled={isLoading}
          className={`px-2 py-1 text-xs rounded-md text-white transition-colors ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          Delete
        </button>
      )}
    </div>
  );
}

CommentActions.propTypes = {
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onReply: PropTypes.func,
  showReply: PropTypes.bool,
  isEditing: PropTypes.bool,
  isLoading: PropTypes.bool,
};
