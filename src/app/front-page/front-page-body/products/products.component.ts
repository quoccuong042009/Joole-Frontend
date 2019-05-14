import { ShareService } from 'src/app/service/share.service';
import { ProductDto } from '../../../model/ProductDto';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() productDtos: ProductDto[];
  selectedProductId: string[] = [];
  invalidNumberCompared = false;

  constructor(private shareService: ShareService, private router: Router) {}

  ngOnInit() {}

  updateChecked(option, event) {
    if (this.selectedProductId.indexOf(option) === -1) {
      this.selectedProductId.push(option);
    } else {
      this.selectedProductId = this.selectedProductId.filter(
        seat => seat !== option
      );
    }
  }

  onCompare() {
    this.invalidNumberCompared = false;
    if (
      this.selectedProductId.length > 3 ||
      this.selectedProductId.length < 2
    ) {
      this.invalidNumberCompared = true;
    } else {
      console.log('ready to change');
      this.shareService.emitChange(this.selectedProductId);
      this.router.navigate(['front-page/products-compare']);
    }
  }
}
