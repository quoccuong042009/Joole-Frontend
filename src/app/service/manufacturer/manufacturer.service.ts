import { Manufacturer } from './../../model/Manufacturer';
import { MANUFACTURER_URL } from './../../app.constant';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  constructor(private httpClient: HttpClient) {}

  getManufacturersBySubCategoryid(id) {
    const url = `${MANUFACTURER_URL}/${'subcategory'}/` + id;
    return this.httpClient.get<Manufacturer[]>(url);
  }
}
