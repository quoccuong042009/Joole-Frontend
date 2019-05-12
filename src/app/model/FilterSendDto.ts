import { TechPropsMinMaxValueDto } from './TechPropsMinMaxValueDto';
import { TypePropsListValuesDto } from 'src/app/model/TypePropsListValuesDto';
import { Manufacturer } from './Manufacturer';

export class FilterSendDto {
  TypePropsListValuesDtos: TypePropsListValuesDto[];
  TechPropsMinMaxValueDtos: TechPropsMinMaxValueDto[];
  Manufacturers: Manufacturer[];
}
