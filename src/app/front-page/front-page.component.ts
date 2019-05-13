import { ManufacturerService } from './../service/manufacturer/manufacturer.service';
import { Manufacturer } from './../model/Manufacturer';
import { Product } from './../model/Product';
import { ProductDto } from '../model/ProductDto';
import { ProductService } from './../service/product/product.service';
import { FilterModalComponent } from './front-page-body/filter-modal/filter-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterService } from './../service/filter/filter.service';
import { FilterDto } from '../model/FilterDto';

import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
