"use client";

import { createTodoAction } from "@/app/_action";
import { useRef, useState, useTransition } from "react";

export default function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function action(data: FormData) {
    const title = data.get("title");
    if (!title || typeof title !== "string") {
      setError("Todo title is required");
      return;
    }

    setError(null);

    // reset form
    formRef.current?.reset();

    startTransition(async () => {
      try {
        // call server action
        await createTodoAction({ title, path: "/with-client-actions" });
      } catch (error) {
        setError("Failed to create todo");
      }
    });
  }

  return (
    <>
      <form
        ref={formRef}
        action={action}
        // key={Math.random()}
        className="flex items-center space-x-2 mb-2"
      >
        <input
          type="text"
          name="title"
          className="border rounded px-2 py-1 flex-1"
        />
        <button
          className="px-4 py-1 text-white rounded bg-green-500 disabled:bg-slate-400"
          disabled={isPending}
        >
          Add
        </button>
      </form>
      <p className="text-sm text-red-500  mb-4">{error && error}</p>
    </>
  );
}
