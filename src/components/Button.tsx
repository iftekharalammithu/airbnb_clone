"use client";
import React from "react";
import { IconType } from "react-icons";

interface Buttonprops {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disable?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<Buttonprops> = ({
  label,
  onClick,
  disable,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      className={` relative disabled:opacity-70  disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${
        outline
          ? "bg-white border-black text-black"
          : "bg-rose-500 border-rose-500 text-white"
      } ${
        small
          ? " py-1 text-sm font-light border-[1px]"
          : "py-3 text-base font-semibold border-2"
      }`}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3"></Icon>}
      {label}
    </button>
  );
};

export default Button;
