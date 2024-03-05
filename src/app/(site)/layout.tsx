import Navigation from "@/app/(site)/__components/navigation";
import { getServerSession } from "next-auth";
import React from "react";
import { redirect } from "next/navigation";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  if (session) {
    redirect("/timer");
  }
  return (
    <main className="h-full">
      <Navigation />
      {children}
    </main>
  );
};

export default HomeLayout;
