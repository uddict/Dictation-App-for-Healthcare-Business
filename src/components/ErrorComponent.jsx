import React from "react";

export const ErrorComponent = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-2">
      <p>{message}</p>
    </div>
  );
};
