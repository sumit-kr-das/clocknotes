import { ModeToggle } from "@/components/global/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../assets/logo.svg";

const Navigation = () => {
  return (
    <header className="max-w-7xl mx-auto fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-50">
      <aside className="flex items-center gap-2">
        <Image src={Logo} width={40} height={40} alt="logo" />
        <span className="text-xl font-bold">Clocknotes</span>
        <div className="border border-primary bg-primary px-2 py-1 rounded-md">
          <p className="text-xs text-white">Beta release</p>
        </div>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-muted px-6 py-3 rounded-full border">
        <ul className="flex items-center justify-center gap-8">
          <Link href={"#"}>Features</Link>
          <Link href={"/timer"}>Usage</Link>
          <Link href={"#"}>FAQ</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <Link href={"/auth/sign-up"}>
          <Button variant="outline">Sign up</Button>
        </Link>
        <Link href={"/auth/sign-in"}>
          <Button>Login</Button>
        </Link>
        <ModeToggle />
      </aside>
    </header>
  );
};

export default Navigation;
