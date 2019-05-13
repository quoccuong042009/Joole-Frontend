import { PRODUCT_URL } from './../../app.constant';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ProductDto } from 'src/app/model/ProductDto';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProductDtoWithProductId(id) {
    const url = `${PRODUCT_URL}/${'productDto'}/` + id;
    return this.httpClient.get<ProductDto>(url);
  }

  getProductDtosWithSubCategoryid(id) {
    const url = `${PRODUCT_URL}/${'productDto'}/${'subcategory'}/` + id;
    return this.httpClient.get<ProductDto[]>(url);
  }
}
