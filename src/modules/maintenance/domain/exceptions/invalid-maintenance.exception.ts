export class InvalidMaintenanceException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidMaintenanceException';
  }
}
