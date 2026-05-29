export declare enum MaterialUnit {
    UNIT = "UNIT",
    METER = "METER",
    LITER = "LITER",
    KILOGRAM = "KILOGRAM",
    PAIR = "PAIR"
}
export declare class MaterialUnitVO {
    private readonly value;
    constructor(value: MaterialUnit);
    getValue(): MaterialUnit;
    equals(other: MaterialUnitVO): boolean;
}
