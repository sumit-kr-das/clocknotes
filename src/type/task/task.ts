type TTask = {
  status: string;
  data: {
    id: string;
    name: string;
    status: string;
    order: number;
    description: string;
    tenantId: string;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};
export default TTask;
