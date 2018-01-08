import { Appointment } from "./appointment";
import { User } from "./user";

export class Receipt extends Appointment {
  user?: User;
  valid?: boolean;
}
