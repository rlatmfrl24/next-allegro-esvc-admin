import SideNavigation from "./side-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surfaceContainerHigh h-screen flex">
      <SideNavigation />
      <nav className="bg-surfaceContainerLow flex-1 rounded-3xl flex flex-col">
        <header className="h-16"></header>
        <main className="bg-surfaceContainerLowest flex-1 rounded-3xl">
          {children}
        </main>
      </nav>
    </div>
  );
}
