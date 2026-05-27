export class MachineNotFoundException extends Error {
  constructor(id: string) {
    super(`Machine with id ${id} not found`);
    this.name = 'MachineNotFoundException';
  }
}
