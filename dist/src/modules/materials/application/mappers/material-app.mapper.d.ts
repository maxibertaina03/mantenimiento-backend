import { Material } from '../../domain/entities/material.entity';
import { CreateMaterialOutput } from '../dtos/create-material.output';
export declare class MaterialAppMapper {
    static toOutput(material: Material): CreateMaterialOutput;
}
