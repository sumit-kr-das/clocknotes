import { Role } from "@prisma/client";

export type TWSettings = {
  id: string;
  name: string;
  companyName: string | null;
  companyLogo: string | null;
  currency: string;
  defaultRate: Number | null;
  projectPermission: Role;
  clientPermission: Role;
  tagPermission: Role;
  timeSheetPermission: Role;
  billingPermission: Role;
} | null;
