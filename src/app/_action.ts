"use server";

import { TodoSchema } from "@/lib/schema";
import { createTodo, deleteTodo, updateTodo } from "@/lib/todos_db";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

export async function createTodoAction({
  title,
  path,
}: {
  title: string;
  path: string;
}) {
  await createTodo(title);
  revalidatePath(path);
}

interface ZodFormatValidationError {
  error: Record<string, { _errors: string[] }>;
}

export async function createTodoActionWithValidation({
  data,
  path,
}: {
  data: FormData;
  path: string;
}): Promise<ZodFormatValidationError | null> {
  try {
    const body = Object.fromEntries(data);
    const { title } = TodoSchema.parse(body);
    await createTodo(title);
    revalidatePath(path);
    return null;
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return { error: error.format() as any };
    }
    throw new Error(String(error));
  }
}

export async function updateTodoAction(
  id: string,
  update: { tilte?: string; completed?: boolean },
  path: string
) {
  await updateTodo(id, update);
  revalidatePath(path);
}

export async function deleteTodoAction({
  id,
  path,
}: {
  id: string;
  path: string;
}) {
  await deleteTodo(id);
  revalidatePath(path);
}
