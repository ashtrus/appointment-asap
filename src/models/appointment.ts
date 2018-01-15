import { Company } from "./company";

export class Appointment {
  constructor(
    public key: string,
    public companyDetails: Company,
    public title: string,
    public description: string,
    public price: string,
    public discount: string,
    public startTime: string,
    public endTime: string,
) { }
}
