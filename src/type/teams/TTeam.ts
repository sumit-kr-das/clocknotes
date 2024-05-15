type TTeam = {
  id: string;
  tenantId: string;
  role: string;
  workspaceId: string | null;
  isActive: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    email: string;
    name: string;
    avatar: string | null;
  };
};

export default TTeam;
