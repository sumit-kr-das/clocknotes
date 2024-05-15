import React from "react";
import { getProject } from "@/app/api/project/project.actions";

const DisplayTasks = async () => {
  const projects = await getProject();

  return <div></div>;
};

export default DisplayTasks;
