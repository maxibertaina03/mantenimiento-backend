export class InvalidMaterialException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidMaterialException';
  }
}
