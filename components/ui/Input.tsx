"use client";

import { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({
  className,
  ...props
}: Props) {
  return (
    <input
      {...props}
      className={clsx(
        "w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500 transition",
        className
      )}
    />
  );
}