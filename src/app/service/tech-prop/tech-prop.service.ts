import { TechPropsMinMaxValueDto } from '../../model/TechPropsMinMaxValueDto';
import { Injectable } from '@angular/core';
import { TECHPROP_URL } from './../../app.constant';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TechPropService {
  constructor(private httpClient: HttpClient) {}

  getTechPropsAndMinMaxValueWithSubCategory(id) {
    const url = `${TECHPROP_URL}/${'minmaxvalue'}/${'subcategory'}/` + id;
    return this.httpClient.get<TechPropsMinMaxValueDto[]>(url);
  }
}
