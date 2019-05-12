import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SUBCATEGORY_URL } from './../../app.constant';
import { SubCategory } from 'src/app/model/SubCategory';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  constructor(private httpClient: HttpClient) {}

  getSubCategoriesByCategoryId(id) {
    const url = `${SUBCATEGORY_URL}/${'category'}/` + id;
    return this.httpClient.get<SubCategory[]>(url);
  }
}
