import { Suspense } from "react";
import TodosList from "./(users)/todos/TodosList";

const Home = () => {
  return (
    <div className="text-black">
      <Suspense fallback={<p>Loading the Todos...</p>}>
        <h1>Loading Todos</h1>
        <div>
          {/* @ts-ignore */}
          <TodosList />
        </div>
      </Suspense>

      <Suspense fallback={<p>Loading the Shopping Cart...</p>}>
        <h1>Loading Shopping Cart</h1>
        <div>
          {/* @ts-ignore */}
          <TodosList />
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
