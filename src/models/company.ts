import { Location } from "./location";

export interface Company {
  companyId?: string;
  cvr?: number;
  title?: string;
  category?: string;
  logoUrl?: string;
  branches?: string[];
  address?: string;
  email?: string;
  phone?: string;
}
