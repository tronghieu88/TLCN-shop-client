import React from "react";

const LoadingSkeleton = ({ className = "" }) => {
  return <div className={`skeleton ${className}`}></div>;
};

export default LoadingSkeleton;

{
  /* <span class="block h-10 w-32 rounded-lg bg-gradient-to-r from-gray-200 to-gray-200/25 animate-pulse"></span>
<br>
<span class="block h-4 w-72 rounded-lg bg-gradient-to-r from-gray-200 to-gray-200/25 animate-pulse"></span>
<br>
<span class="block h-4 w-72 rounded-lg bg-gradient-to-r from-gray-200 to-gray-200/25 animate-pulse"></span> */
}
