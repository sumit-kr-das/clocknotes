type TInviteTeam = {
  id: string;
  tenantId: string | null;
  role: string;
  workspaceId: string;
  isActive: boolean;
  email: string;
  userId: string | null;
  isJoined: boolean;
  createdAt: Date;
  updatedAt: Date;
  workspace: {
    name: string;
  };
};
export default TInviteTeam;
