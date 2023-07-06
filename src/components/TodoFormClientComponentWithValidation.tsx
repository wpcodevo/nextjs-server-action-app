"use client";

import { createTodoActionWithValidation } from "@/app/_action";
import { useRef, useState } from "react";
import Button from "./Button";

type ValidationError = Record<string, { _errors: string[] }>;

export default function TodoForm() {
  const [validationError, setValidationError] =
    useState<ValidationError | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function action(data: FormData) {
    setValidationError(null);
    const results = await createTodoActionWithValidation({
      data,
      path: "/with-client-actions-and-form-validation",
    });
    if (results?.error) {
      setValidationError(results.error);
    }
    formRef?.current?.reset();
  }

  return (
    <>
      <form
        action={action}
        ref={formRef}
        className="flex items-center space-x-2 mb-2"
      >
        <input
          type="text"
          name="title"
          className="border rounded px-2 py-1 flex-1"
        />
        {/* <button className="px-4 py-1 text-white rounded bg-green-500">
          Add
        </button> */}
        <Button>Add</Button>
      </form>
      <p className="text-sm text-red-500  mb-4">
        {validationError?.title && validationError.title._errors.join(", ")}
      </p>
    </>
  );
}
