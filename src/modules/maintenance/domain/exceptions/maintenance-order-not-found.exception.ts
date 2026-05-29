export class MaintenanceOrderNotFoundException extends Error {
  constructor(id: string) {
    super(`Maintenance order with id ${id} not found`);
    this.name = 'MaintenanceOrderNotFoundException';
  }
}
