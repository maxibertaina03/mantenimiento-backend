import { MachineResponseDto } from '../dtos/machine.response.dto';
import { CreateMachineOutput } from '../../application/dtos/create-machine.output';
export declare class MachinePresenterMapper {
    static toResponse(output: CreateMachineOutput): MachineResponseDto;
}
