import { HeaderComponent } from "./components/header";
import SideNavigation from "./components/side-nav";
import { BottomFloatingBar } from "./components/bottom-floating-bar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surfaceContainerHigh h-screen flex">
      <SideNavigation />
      <nav className="relative bg-surfaceContainerLow flex-1 rounded-3xl flex flex-col">
        <HeaderComponent branch="KRPUS" />
        <main className="bg-surfaceContainerLowest flex-1 rounded-3xl px-8 py-6 flex flex-col overflow-auto">
          {children}
        </main>
        <BottomFloatingBar />
      </nav>
    </div>
  );
}
