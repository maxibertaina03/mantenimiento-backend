export enum MaterialUnit {
  UNIT = 'UNIT',
  METER = 'METER',
  LITER = 'LITER',
  KILOGRAM = 'KILOGRAM',
  PAIR = 'PAIR',
}

export class MaterialUnitVO {
  constructor(private readonly value: MaterialUnit) {
    if (!Object.values(MaterialUnit).includes(value)) throw new Error(`Invalid material unit: ${value}`);
  }
  getValue(): MaterialUnit { return this.value; }
  equals(other: MaterialUnitVO): boolean { return this.value === other.value; }
}
