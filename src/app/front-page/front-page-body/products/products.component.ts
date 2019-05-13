import { ProductDto } from '../../../model/ProductDto';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() productDtos: ProductDto[];
  constructor() {}

  ngOnInit() {}
}
