import Image from "next/image";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import GoogelLogo from "@/assets/site/logo-google.svg";
import {
  createWorkspace,
  hasWorkspace,
} from "@/app/(main)/ws/actions/workspace.action";
import { createTeam } from "@/app/(main)/ws/[workspaceId]/teams/actions/teams.action";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

const GoogleSignInButton = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleClick = async () => {
    try {
      setLoading(true);
      await signIn("google", {
        callbackUrl: "http://localhost:3000/ws",
      });
    } catch (err) {
      setLoading(false);
    } finally {
      console.log("finnaly");
      setLoading(false);
    }
  };
  return (
    <>
      <Button
        onClick={handleClick}
        className="w-full gap-2"
        variant="outline"
        type="submit"
      >
        {loading && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        )}
        <Image src={GoogelLogo} width={20} height={20} alt="google logo" />
        <p>{children}</p>
      </Button>
    </>
  );
};

export default GoogleSignInButton;
