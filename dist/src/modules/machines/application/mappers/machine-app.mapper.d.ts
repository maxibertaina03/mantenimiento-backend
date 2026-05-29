import { Machine } from '../../domain/entities/machine.entity';
import { CreateMachineOutput } from '../dtos/create-machine.output';
import { MachineListItemDto } from '../dtos/list-machines.output';
export declare class MachineAppMapper {
    static toOutput(machine: Machine): CreateMachineOutput;
    static toListItem(machine: Machine): MachineListItemDto;
}
