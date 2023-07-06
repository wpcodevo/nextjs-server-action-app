import { prisma } from "./prisma";

interface TodoFiler {
  page?: number;
  limit?: number;
}

export async function getTodos(filter: TodoFiler = {}) {
  try {
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    const skip = (page - 1) * limit;

    const todos = await prisma.todo.findMany({
      take: limit,
      skip,
    });

    return {
      todos,
      page,
      limit,
      results: todos.length,
    };
  } catch (error) {
    return { error };
  }
}

export async function createTodo(title: string) {
  try {
    const todo = await prisma.todo.create({
      data: { title },
    });

    return { todo };
  } catch (error) {
    return { error };
  }
}

export async function getTodo(id: string) {
  try {
    const todo = await prisma.todo.findUnique({
      where: { id },
    });
    return { todo };
  } catch (error) {
    return { error };
  }
}

export async function updateTodo(
  id: string,
  { title, completed }: { title?: string; completed?: boolean }
) {
  try {
    const todo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        completed,
      },
    });
    return { todo };
  } catch (error) {
    return { error };
  }
}

export async function deleteTodo(id: string) {
  try {
    await prisma.todo.delete({ where: { id } });
  } catch (error) {
    return { error };
  }
}
