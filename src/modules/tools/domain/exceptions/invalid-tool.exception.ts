export class InvalidToolException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidToolException';
  }
}
