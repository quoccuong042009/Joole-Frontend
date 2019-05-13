import { TechPropsMinMaxValueDto } from './TechPropsMinMaxValueDto';
import { TypePropsListValuesDto } from 'src/app/model/TypePropsListValuesDto';
import { Manufacturer } from './Manufacturer';

export class FilterDto {
  SubCategoryId: number;
  TypePropsListValuesDtos: TypePropsListValuesDto[];
  TechPropsMinMaxValueDtos: TechPropsMinMaxValueDto[];
  Manufacturers: Manufacturer[];
}
