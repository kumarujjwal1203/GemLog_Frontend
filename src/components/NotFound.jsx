// import { Link } from "react-router-dom";

// export default function NotFound() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full text-center">
//         <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
//         <h1 className="text-2xl font-semibold text-gray-900 mb-4">
//           Page Not Found
//         </h1>
//         <p className="text-gray-600 mb-8">
//           The page you're looking for doesn't exist or has been moved.
//         </p>
//         <div className="space-y-4">
//           <Link
//             to="/posts"
//             className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
//           >
//             Go to Posts
//           </Link>
//           <div>
//             <Link
//               to="/"
//               className="text-teal-600 hover:text-teal-800 transition-colors"
//             >
//               ← Back to Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-teal-50 to-teal-100">
      <div className="max-w-md w-full text-center p-4">
        <img
          src="https://stories.freepiklabs.com/storage/53059/404-error-page-not-found-animate.svg"
          alt="404 Not Found"
          className="w-full max-w-xs mx-auto mb-6"
        />
        <div className="text-6xl font-bold text-gray-300 mb-4 animate-pulse">
          404
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4">
          <Link
            to="/posts"
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Go to Posts
          </Link>
          <div>
            <Link
              to="/"
              className="text-teal-600 hover:text-teal-800 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
