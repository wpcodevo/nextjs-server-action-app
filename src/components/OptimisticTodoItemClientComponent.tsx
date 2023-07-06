"use client";

import { deleteTodoAction, updateTodoAction } from "@/app/_action";
import { Todo } from "@prisma/client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import {
  experimental_useOptimistic as useOptimistic,
  useTransition,
} from "react";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  // For the Update Operation
  const { pending } = useFormStatus();
  const [optimisticTodo, addOptimisticTodo] = useOptimistic(
    todo,
    (state: Todo, completed: boolean) => ({ ...state, completed })
  );

  // For the Delete Operation
  const [isPending, startTransition] = useTransition();

  async function handleOnChangeOrOnClick() {
    addOptimisticTodo(!todo.completed);
    await updateTodoAction(
      todo.id,
      { completed: !todo.completed },
      "/optimistic-updates-client-component"
    );
  }

  return (
    <div className="flex items-center space-x-2 mb-2">
      <span
        className={`text-gray-700 flex-1 ${
          optimisticTodo.completed ? "line-through" : ""
        }`}
        onClick={handleOnChangeOrOnClick}
      >
        {todo.title}
      </span>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={optimisticTodo.completed}
          name="completed"
          onChange={handleOnChangeOrOnClick}
          disabled={pending}
          className="h-6 w-6 border-gray-300 disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed"
        />
        <button
          disabled={isPending}
          className="px-2 py-1 ml-2 text-white rounded bg-red-500 disabled:bg-gray-400"
          onClick={() =>
            startTransition(() =>
              deleteTodoAction({
                id: todo.id,
                path: "/optimistic-updates-client-component",
              })
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
