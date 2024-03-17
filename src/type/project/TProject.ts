import { DateTime } from "next-auth/providers/kakao";

export type TProject = {
  id: string;
  name: string;
  color: string | null;
  accessType?: boolean;
  totalAmount?: number;
  isBillable?: boolean;
  rate?: number;
  createdAt?: string;
  updatedAt?: string;
  tenantId?: string;
  clientId?: string;
  client?: {
    id: string;
    name: string;
    color: string | null;
    avatar: string | null;
    email: string | null;
    address?: string;
    note?: string;
    currency?: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    tenantId: string;
  };
};
