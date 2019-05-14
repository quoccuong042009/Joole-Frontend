import { ProductService } from './../../../service/product/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-documentation',
  templateUrl: './product-documentation.component.html',
  styleUrls: ['./product-documentation.component.css']
})
export class ProductDocumentationComponent implements OnInit {
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
