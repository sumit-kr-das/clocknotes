import ProjectTable from "@/app/(main)/project/_components/project-table";
import { columns } from "@/app/(main)/project/_components/columns";
import { getProject } from "@/app/api/project/project.actions";

const Project = async () => {
  const projects = await getProject();
  return <>{projects && <ProjectTable data={projects} columns={columns} />}</>;
};

export default Project;
