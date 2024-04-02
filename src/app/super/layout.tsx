import Logo from "../components/logo";
import { UserMenu } from "../components/user-menu";

export default function SuperLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  return (
    <nav className="flex-1 flex flex-col bg-surfaceContainer ">
      <header className="h-16 flex items-center justify-between ">
        <Logo className="ml-5" />

        <UserMenu />
      </header>
      <section className="bg-surfaceContainerLow flex-1 rounded-3xl flex flex-col font-pretendard">
        {props.children}
      </section>
    </nav>
  );
}
