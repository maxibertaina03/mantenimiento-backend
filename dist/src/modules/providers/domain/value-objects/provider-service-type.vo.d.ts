export declare enum ProviderServiceType {
    MAINTENANCE = "MAINTENANCE",
    PARTS = "PARTS",
    TOOLS = "TOOLS",
    MATERIALS = "MATERIALS",
    CONSULTING = "CONSULTING",
    OTHER = "OTHER"
}
export declare class ProviderServiceTypeVO {
    private readonly value;
    constructor(value: ProviderServiceType);
    getValue(): ProviderServiceType;
    equals(other: ProviderServiceTypeVO): boolean;
}
