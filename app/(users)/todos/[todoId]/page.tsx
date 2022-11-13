import React from "react";
import { Todo } from "../../../../typings";
import { notFound } from "next/navigation";

export const dynamicParams = true;

type PageProps = {
  params: {
    todoId: string; // should correlate to the page folder dynamic name
  };
};

// in development mode (yarn build) it will always use server side rendering. Only way to test static rendering -> yarn run build - yarn start

const fetchTodo = async (todoId: string) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    { next: { revalidate: 60 } }
  );
  // cache -> no cache - force server side rendering, Static Site generation (getStaticProps) alternative -> force-cache
  // ISR (revalidate page after a certain period of time) -> next: {revalidate: 60} - revalidate every 60 seconds
  const todo: Todo = await res.json();
  return todo;
};

async function TodoPage({ params: { todoId } }: PageProps) {
  const todo = await fetchTodo(todoId);

  if (!todo.id) return notFound(); // since page id > 10, next will try to server side render the new todo, when it gets undefined back it will return notFound() function (page with 404 error). We can use not-found.tsx page to customize default 404 page
  return (
    <div className="p-10 bg-yellow-200 border-2 m-2 shadow-lg">
      <p>
        #{todo.id}: {todo.title}
      </p>
      <p>Completed: {todo.completed ? "Yes" : "No"}</p>
      <p className="border-t border-black mt-5 text-right">
        By User: {todo.userId}
      </p>
    </div>
  );
}

export default TodoPage;

export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos: Todo[] = await res.json();

  const trimmedTodos = todos.splice(0, 10); // for the development we only prebuild first 10 pages to avoid hitting the limit of the DEMO API.

  return trimmedTodos.map((todo) => ({
    todoId: todo.id.toString(),
  }));
}
