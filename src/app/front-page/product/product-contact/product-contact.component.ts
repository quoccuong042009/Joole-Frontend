import { ProductService } from './../../../service/product/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-contact',
  templateUrl: './product-contact.component.html',
  styleUrls: ['./product-contact.component.css']
})
export class ProductContactComponent implements OnInit {
  productDto;
  productId;
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
    });
  }
}
