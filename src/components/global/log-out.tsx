"use client";
import { signOut } from "next-auth/react";
import React from "react";

const Logout = ({ children }: { children: React.ReactNode }) => {
  const logout = () => {
    signOut({
      redirect: true,
      callbackUrl: "/",
    });
  };
  return <div onClick={logout}>{children}</div>;
};

export default Logout;
