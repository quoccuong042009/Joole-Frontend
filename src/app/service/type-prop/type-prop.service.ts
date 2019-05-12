import { Injectable } from '@angular/core';
import { TYPEPROP_URL } from './../../app.constant';

import { HttpClient } from '@angular/common/http';
import { TypePropsListValuesDto } from 'src/app/model/TypePropsListValuesDto';

@Injectable({
  providedIn: 'root'
})
export class TypePropService {
  constructor(private httpClient: HttpClient) {}

  getTypePropsAndMinMaxValueWithSubCategory() {
    const url = `${TYPEPROP_URL}/${'value'}`;
    return this.httpClient.get<TypePropsListValuesDto[]>(url);
  }
}
