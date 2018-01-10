import { Location } from "./location";

export interface Company {
  companyId?: string;
  cvr?: number;
  title?: string;
  category?: string;
  logoUrl?: string;
  branches?: Location[];
}
