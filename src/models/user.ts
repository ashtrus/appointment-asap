import { Filter } from "./filter";

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  companyName?: string;
  filters?: Filter;
}
