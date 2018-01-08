import { Location } from "./location";

export interface Company {
  cvr?: number;
  title?: string;
  category?: string;
  logoUrl?: string;
  branches?: Location[];
}
