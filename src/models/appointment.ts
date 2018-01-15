export class Appointment {
  constructor(
    public key: string,
    public companyId: string,
    public companyName: string,
    public title: string,
    public description: string,
    public price: string,
    public discount: string,
    public startTime: string,
    public endTime: string,
) { }
}
