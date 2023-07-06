import TodoFormClientComponent from "@/components/TodoFormClientComponent";
import TodoItemClientComponent from "@/components/TodoItemClientComponent";
import { getTodos } from "@/lib/todos_db";

const Page = async () => {
  const { todos, results } = await getTodos();

  return (
    <div className="container mx-auto max-w-md p-4">
      <TodoFormClientComponent />
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      {results === 0 ? (
        <p className="text-center">No Todos Found</p>
      ) : (
        todos?.map((todo) => (
          <TodoItemClientComponent key={todo.id} todo={todo} />
        ))
      )}
    </div>
  );
};

export default Page;
