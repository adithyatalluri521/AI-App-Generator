"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Card({
  children,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      {children}
    </div>
  );
}