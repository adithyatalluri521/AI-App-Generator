"use client";

import { ReactNode } from "react";

interface Props {
  open: boolean;
  children: ReactNode;
}

export default function Modal({
  open,
  children,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-slate-900 rounded-2xl p-8 w-full max-w-lg">
        {children}
      </div>
    </div>
  );
}