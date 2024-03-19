export type TProject = {
  id: string;
  name: string;
  color: string | null;
  accessType?: string;
  totalAmount?: number;
  isBillable?: boolean;
  currencyType?: string;
  rate?: number;
  createdAt?: Date;
  updatedAt?: Date;
  tenantId?: string;
  clientId: string | null;
  client?: {
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
  } | null;
};
