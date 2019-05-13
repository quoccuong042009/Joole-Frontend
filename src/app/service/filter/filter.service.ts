import { FilterDto } from '../../model/FilterDto';
import { FILTER_URL } from './../../app.constant';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ProductDto } from 'src/app/model/ProductDto';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor(private httpClient: HttpClient) {}

  getFilterSentDtoBySubCategoryId(id) {
    const url = `${FILTER_URL}/${'subcategory'}/` + id;
    return this.httpClient.get<FilterDto>(url);
  }

  getProductDtosByFilterDto(filterDto) {
    const url = `${FILTER_URL}`;
    return this.httpClient.post<ProductDto[]>(url, filterDto);
  }
}
