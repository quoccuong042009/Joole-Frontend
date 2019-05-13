import { TechPropsMinMaxValueDto } from './TechPropsMinMaxValueDto';
import { TypePropsStringValuesDto } from './TypePropsStringValuesDto';
import { Product } from './Product';
export class ProductDto {
  Product: Product;
  TypeProps: TypePropsStringValuesDto[];
  TechProps: TechPropsMinMaxValueDto[];
}
