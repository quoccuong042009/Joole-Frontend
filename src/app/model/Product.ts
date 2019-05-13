import { Sale } from './Sale';
import { Manufacturer } from './Manufacturer';
import { SubCategory } from './SubCategory';
import { Series } from './Series';

export class Product {
  Id: number;
  Image: string;
  Model: string;
  SubCategoryId: number;
  SubCategory: SubCategory;
  ManufacturerId: number;
  Manufacturer: Manufacturer;
  SeriesId: number;
  Series: Series;
  SaleId: number;
  Sale: Sale;
}
