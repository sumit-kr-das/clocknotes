import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="h-full">{children}</main>;
};

export default DashboardLayout;
