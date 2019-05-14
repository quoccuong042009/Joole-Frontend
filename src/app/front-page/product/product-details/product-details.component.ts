import { Product } from './../../../model/Product';
import { Series } from './../../../model/Series';
import { ProductService } from './../../../service/product/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productDto;
  productId;
  series: string[];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productId = this.route.parent.snapshot.paramMap.get('productId');
    this.getProductDtoByProductId(this.productId);
  }

  getProductDtoByProductId(id) {
    this.productService.getProductDtoWithProductId(id).subscribe(response => {
      this.productDto = response;
      this.series = this.productDto.Product.Series.Info.split('|');
    });
  }
}
