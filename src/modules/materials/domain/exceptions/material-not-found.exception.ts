export class MaterialNotFoundException extends Error {
  constructor(id: string) {
    super(`Material with id ${id} not found`);
    this.name = 'MaterialNotFoundException';
  }
}
