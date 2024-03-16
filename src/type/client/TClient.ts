import { DateTime } from "next-auth/providers/kakao";

export type TClient = {
  id: string;
  name: string;
  color: string | null;
  avatar: string | null;
  email: string | null;
  address: string | null;
  note: string | null;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  tenantId: string;
};
