export class InvalidProviderException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidProviderException';
  }
}
