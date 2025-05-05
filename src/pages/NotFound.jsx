import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white px-4">
      <img
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="404 Not Found"
        className="w-full max-w-md mb-8"
      />
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-2">Oops! Page not found</p>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => window.history.back()}
        className="px-6 py-3 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
