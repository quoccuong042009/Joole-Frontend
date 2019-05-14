import { ProductService } from './../../service/product/product.service';
import { ProductDto } from 'src/app/model/ProductDto';
import { ShareService } from 'src/app/service/share.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare-products',
  templateUrl: './compare-products.component.html',
  styleUrls: ['./compare-products.component.css']
})
export class CompareProductsComponent implements OnInit {
  listProductId = [];
  productDtos: ProductDto[] = [];
  constructor(
    private shareService: ShareService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.shareService.changeEmitted$.subscribe(r => {
      console.log('inside compare');
      this.listProductId = r;
      console.log(this.listProductId);
      for (const productId of this.listProductId) {
        this.productService
          .getProductDtoWithProductId(productId)
          .subscribe(response => this.productDtos.push(response));
      }
    });
  }
}
