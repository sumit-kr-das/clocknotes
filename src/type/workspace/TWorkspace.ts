import { Role } from "@prisma/client";

export type TWorkspace = {
  id: string;
  name: string;
  inviteString: string;
  type: string;
  tenantId: string;
};

export type TAllWorkspace = {
  id: string;
  tenantId: string;
  role: Role;
  workspaceId: string | null;
  createdAt: Date;
  updatedAt: Date;
  workspace: {
    id: string;
    name: string;
    inviteString: string;
    tenantId: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
};
