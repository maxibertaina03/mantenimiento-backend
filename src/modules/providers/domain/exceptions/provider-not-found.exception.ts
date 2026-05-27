export class ProviderNotFoundException extends Error {
  constructor(id: string) {
    super(`Provider with id ${id} not found`);
    this.name = 'ProviderNotFoundException';
  }
}
