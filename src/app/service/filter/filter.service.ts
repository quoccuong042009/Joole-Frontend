import { FilterSendDto } from './../../model/FilterSendDto';
import { FILTER_URL } from './../../app.constant';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor(private httpClient: HttpClient) {}

  getFilterSentDtoBySubCategoryId(id) {
    const url = `${FILTER_URL}/${'send'}/${'subcategory'}/` + id;
    return this.httpClient.get<FilterSendDto>(url);
  }
}
