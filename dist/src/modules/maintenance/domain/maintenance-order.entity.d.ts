import { Prisma } from '@prisma/client';
import type { MaintenanceLocation, MaintenanceStatus, MaintenanceType } from '@prisma/client';
declare const Decimal: typeof Prisma.Decimal;
type Decimal = Prisma.Decimal;
export interface CompleteInput {
    machineHoursSnapshot: string;
    cost?: string | null;
    currency?: string | null;
    observations?: string | null;
}
export declare class MaintenanceOrder {
    readonly id: string;
    readonly machineId: string;
    readonly type: MaintenanceType;
    private _status;
    private _location;
    private _externalLocation;
    private _scheduledFor;
    private _startedAt;
    private _completedAt;
    private _machineHoursSnapshot;
    private _technicianId;
    private _providerId;
    private _cost;
    private _currency;
    private _description;
    private _observations;
    readonly tenantId: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    private constructor();
    get status(): MaintenanceStatus;
    get location(): MaintenanceLocation;
    get externalLocation(): string | null;
    get scheduledFor(): Date | null;
    get startedAt(): Date | null;
    get completedAt(): Date | null;
    get machineHoursSnapshot(): Decimal | null;
    get technicianId(): string | null;
    get providerId(): string | null;
    get cost(): Decimal | null;
    get currency(): string | null;
    get description(): string | null;
    get observations(): string | null;
    start(at?: Date): {
        from: MaintenanceStatus;
        to: MaintenanceStatus;
    };
    complete(input: CompleteInput, at?: Date): {
        from: MaintenanceStatus;
        to: MaintenanceStatus;
        hoursSnapshot: Decimal;
    };
    cancel(reason?: string): {
        from: MaintenanceStatus;
        to: MaintenanceStatus;
    };
    updateMetadata(input: {
        location?: MaintenanceLocation;
        externalLocation?: string | null;
        scheduledFor?: Date | null;
        technicianId?: string | null;
        providerId?: string | null;
        description?: string | null;
        observations?: string | null;
    }): void;
    derivedMachineStatus(): 'INTERNAL_MAINTENANCE' | 'EXTERNAL_MAINTENANCE' | 'OPERATIONAL' | null;
    static rehydrate(props: {
        id: string;
        machineId: string;
        type: MaintenanceType;
        status: MaintenanceStatus;
        location: MaintenanceLocation;
        externalLocation: string | null;
        scheduledFor: Date | null;
        startedAt: Date | null;
        completedAt: Date | null;
        machineHoursSnapshot: Decimal | string | null;
        technicianId: string | null;
        providerId: string | null;
        cost: Decimal | string | null;
        currency: string | null;
        description: string | null;
        observations: string | null;
        tenantId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }): MaintenanceOrder;
}
export {};
