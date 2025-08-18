import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50 ${
        props.className || ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
