import type { ToolStatus } from '@prisma/client';
export declare class Tool {
    readonly id: string;
    readonly code: string;
    private _name;
    private _description;
    private _brand;
    private _model;
    private _serialNumber;
    private _status;
    private _location;
    private _observations;
    private _acquiredAt;
    readonly tenantId: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    private constructor();
    get name(): string;
    get description(): string | null;
    get brand(): string | null;
    get model(): string | null;
    get serialNumber(): string | null;
    get status(): ToolStatus;
    get location(): string | null;
    get observations(): string | null;
    get acquiredAt(): Date | null;
    updateMetadata(input: {
        name?: string;
        description?: string | null;
        brand?: string | null;
        model?: string | null;
        serialNumber?: string | null;
        location?: string | null;
        observations?: string | null;
        acquiredAt?: Date | null;
    }): void;
    loan(): {
        from: ToolStatus;
        to: ToolStatus;
    };
    returnFromLoan(): {
        from: ToolStatus;
        to: ToolStatus;
    };
    changeAdministrativeStatus(next: ToolStatus): {
        from: ToolStatus;
        to: ToolStatus;
    };
    static rehydrate(props: {
        id: string;
        code: string;
        name: string;
        description: string | null;
        brand: string | null;
        model: string | null;
        serialNumber: string | null;
        status: ToolStatus;
        location: string | null;
        observations: string | null;
        acquiredAt: Date | null;
        tenantId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }): Tool;
}
