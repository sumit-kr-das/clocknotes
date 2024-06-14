import { Role } from "@prisma/client";

export type TWorkspace = {
  id: string;
  name: string;
  inviteString: string;
  type: string;
  tenantId: string | null;
};

export type TAllWorkspace = {
  id: string;
  tenantId: string | null;
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
