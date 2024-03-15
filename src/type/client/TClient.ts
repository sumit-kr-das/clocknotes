import { DateTime } from "next-auth/providers/kakao";

export type TClient = {
  id: string;
  name: string;
  color?: string;
  avatar?: string;
  email?: string;
  address?: string;
  note?: string;
  currency: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  tenantId: string;
  tenant: [];
  activities: [];
  projects: [];
};
