import TodosList from "./TodosList";

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex">
      <div>
        {/* @ts-ignore */}
        <TodosList />
      </div>
      <div className="flex-1">{children}</div>
    </main>
  );
}

export default RootLayout;
