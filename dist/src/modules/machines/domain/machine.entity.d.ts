import { Prisma } from '@prisma/client';
import type { MachineStatus } from '@prisma/client';
declare const Decimal: typeof Prisma.Decimal;
type Decimal = Prisma.Decimal;
export interface PreventivePlan {
    intervalHours: Decimal | null;
    lastDoneAtHours: Decimal | null;
}
export declare class Machine {
    readonly id: string;
    readonly code: string;
    private _name;
    private _brand;
    private _model;
    private _serialNumber;
    private _status;
    private _usageHours;
    private _location;
    private _responsibleId;
    private _notes;
    private _preventive;
    readonly tenantId: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    private constructor();
    get name(): string;
    get brand(): string | null;
    get model(): string | null;
    get serialNumber(): string | null;
    get status(): MachineStatus;
    get usageHours(): Decimal;
    get location(): string | null;
    get responsibleId(): string | null;
    get notes(): string | null;
    get preventive(): PreventivePlan;
    rename(name: string): void;
    updateMetadata(input: {
        brand?: string | null;
        model?: string | null;
        serialNumber?: string | null;
        location?: string | null;
        responsibleId?: string | null;
        notes?: string | null;
        preventiveIntervalHours?: string | null;
    }): void;
    changeStatus(next: MachineStatus): {
        from: MachineStatus;
        to: MachineStatus;
    };
    logUsageHours(input: {
        hoursAfter: string;
    }): {
        hoursBefore: Decimal;
        hoursAfter: Decimal;
        delta: Decimal;
    };
    markPreventiveCompleted(atHours: string): void;
    isPreventiveDue(): boolean;
    hoursUntilPreventive(): Decimal | null;
    static rehydrate(props: {
        id: string;
        code: string;
        name: string;
        brand: string | null;
        model: string | null;
        serialNumber: string | null;
        status: MachineStatus;
        usageHours: Decimal | string;
        location: string | null;
        responsibleId: string | null;
        notes: string | null;
        preventiveIntervalHours: Decimal | string | null;
        lastPreventiveAtHours: Decimal | string | null;
        tenantId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }): Machine;
}
export {};
