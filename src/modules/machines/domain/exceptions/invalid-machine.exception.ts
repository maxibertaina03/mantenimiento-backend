export class InvalidMachineException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidMachineException';
  }
}
