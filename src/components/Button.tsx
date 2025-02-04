import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-purple-600 text-white font-semibold py-3 rounded-md transition-all
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700 active:bg-purple-800"}`}
    >
      {text}
    </button>
  );
};

export default Button;
