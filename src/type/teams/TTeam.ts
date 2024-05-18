type TTeam = {
  id: string;
  tenantId: string | null;
  role: string;
  workspaceId: string | null;
  isActive: boolean;
  email: string | null;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
  isJoined: boolean;
  user: {
    email: string;
    name: string;
    avatar: string | null;
  } | null;
};

export default TTeam;
