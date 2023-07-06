import Link from "next/link";

const Home = async () => {
  return (
    <div className="container mx-auto max-w-lg p-4">
      <h1 className="text-2xl font-bold mb-3">
        Server Actions and Data Mutations
      </h1>
      <div className="flex space-y-4 flex-col text-blue-700 text-lg">
        <Link href="/with-server-actions" className="hover:underline" prefetch>
          with-server-actions
        </Link>
        <Link href="/with-client-actions" className="hover:underline" prefetch>
          with-client-actions
        </Link>
        <Link
          href="/with-client-actions-and-form-validation"
          className="hover:underline"
          prefetch
        >
          with-client-actions-and-form-validation
        </Link>
        <Link
          href="/optimistic-updates-client-component"
          className="hover:underline"
          prefetch
        >
          optimistic-updates-client-component
        </Link>
      </div>
    </div>
  );
};

export default Home;
