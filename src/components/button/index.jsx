import React from "react";

export const Button = ({ children, ...props }) => {
  return (
    <button className="px-5 py-2 bg-black text-white rounded" {...props}>
      {children}
    </button>
  );
};
