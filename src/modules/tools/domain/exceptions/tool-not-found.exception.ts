export class ToolNotFoundException extends Error {
  constructor(id: string) {
    super(`Tool with id ${id} not found`);
    this.name = 'ToolNotFoundException';
  }
}
