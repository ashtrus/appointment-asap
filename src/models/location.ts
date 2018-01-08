import { Company } from "./company";

export interface Location extends Company {
  id: string;
  city?: string;
  address?: string;
  post?: string;
  email?: string;
  phone?: string;
}
