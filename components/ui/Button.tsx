"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-xl px-6 py-3 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
        {
          "bg-blue-600 hover:bg-blue-700 text-white":
            variant === "primary",

          "bg-slate-700 hover:bg-slate-600 text-white":
            variant === "secondary",

          "bg-red-600 hover:bg-red-700 text-white":
            variant === "danger",
        },
        className
      )}
    >
      {children}
    </button>
  );
}