import { ModeToggle } from "@/components/global/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../assets/logo.svg";

const Navigation = () => {
  return (
    <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10">
      <aside className="flex items-center gap-2">
        <Image src={Logo} width={40} height={40} alt="logo" />
        <span className="text-xl font-bold">Clocknotes</span>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-muted px-6 py-3 rounded-full border">
        <ul className="flex items-center justify-center gap-8">
          <Link href={"/timer"}>Timer</Link>
          <Link href={"#"}>Pricing</Link>
          <Link href={"#"}>Documentation</Link>
          <Link href={"#"}>Features</Link>
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
    </div>
  );
};

export default Navigation;
