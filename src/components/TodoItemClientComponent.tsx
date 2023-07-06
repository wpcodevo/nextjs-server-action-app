"use client";

import { deleteTodoAction, updateTodoAction } from "@/app/_action";
import { Todo } from "@prisma/client";
import { useTransition } from "react";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center space-x-2 mb-2">
      <span
        className={`text-gray-700 flex-1 ${
          todo.completed ? "line-through" : ""
        }`}
        onClick={() =>
          startTransition(() =>
            updateTodoAction(
              todo.id,
              { completed: !todo.completed },
              "/with-client-actions"
            )
          )
        }
      >
        {todo.title}
      </span>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          name="completed"
          onChange={() =>
            startTransition(() =>
              updateTodoAction(
                todo.id,
                { completed: !todo.completed },
                "/with-client-actions"
              )
            )
          }
          disabled={isPending}
          className="h-6 w-6 border-gray-300"
        />
        <button
          disabled={isPending}
          className={`px-2 py-1 ml-2 text-white rounded ${
            isPending ? "bg-gray-400" : "bg-red-500"
          }`}
          onClick={() =>
            startTransition(() =>
              deleteTodoAction({ id: todo.id, path: "/with-client-actions" })
            )
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
