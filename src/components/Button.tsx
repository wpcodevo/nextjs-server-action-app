"use client";

import React from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

interface ButtonProps {
  children: React.ReactNode;
}

export default function Button({ children }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      className="px-4 py-1 text-white rounded bg-green-500 disabled:bg-gray-400"
      disabled={pending}
    >
      {children}
    </button>
  );
}
