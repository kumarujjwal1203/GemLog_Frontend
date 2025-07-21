import PropTypes from "prop-types";

export default function LoadingSpinner({
  size = "md",
  color = "blue",
  className = "",
}) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
    xl: "h-14 w-14",
  };

  const borderColor = {
    blue: "border-blue-600",
    gray: "border-gray-500",
    white: "border-white",
    black: "border-black",
    red: "border-red-600",
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-2 border-t-transparent ${sizeClasses[size]} ${borderColor[color]}`}
      ></div>
    </div>
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  color: PropTypes.oneOf(["blue", "gray", "white", "black", "red"]),
  className: PropTypes.string,
};
