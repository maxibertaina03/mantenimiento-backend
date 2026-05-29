import { CreateMaterialOutput } from '../../application/dtos/create-material.output';
import { MaterialResponseDto } from '../dtos/material.response.dto';
export declare class MaterialPresenterMapper {
    static toResponse(output: CreateMaterialOutput): MaterialResponseDto;
}
