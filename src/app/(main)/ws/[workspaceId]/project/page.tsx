import ProjectTable from "@/app/(main)/ws/[workspaceId]/project/_components/project-table";
import { columns } from "@/app/(main)/ws/[workspaceId]/project/_components/columns";
import { getProject } from "@/app/api/project/project.actions";

const Project = async ({ params }: any) => {
  const projects = await getProject({ workspaceId: params.workspaceId });

  return <>{projects && <ProjectTable data={projects} columns={columns} />}</>;
};

export default Project;
