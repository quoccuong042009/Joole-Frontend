import { Category } from './../../model/Category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CATEGORY_URL } from './../../app.constant';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getCategories() {
        const url = `${CATEGORY_URL}`;
        return this.httpClient.get<Category[]>(url);
    }
}
