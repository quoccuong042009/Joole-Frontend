import { ShareService } from './../../service/share.service';
import { ProductDto } from './../../model/ProductDto';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../service/product/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productId;
  productDto: ProductDto;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('productId');
    this.getProductDtoByProductId(this.productId);
  }

  getProductDtoByProductId(id) {
    this.productService.getProductDtoWithProductId(id).subscribe(response => {
      this.productDto = response;
    });
  }
}
