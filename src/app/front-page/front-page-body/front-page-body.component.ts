import { ProductDto } from './../../model/ProductDto';
import { ManufacturerService } from './../../service/manufacturer/manufacturer.service';
import { Manufacturer } from './../../model/Manufacturer';

import { ProductService } from './../../service/product/product.service';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterService } from './../../service/filter/filter.service';
import { FilterDto } from '../../model/FilterDto';

import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-front-page-body',
  templateUrl: './front-page-body.component.html',
  styleUrls: ['./front-page-body.component.css']
})
export class FrontPageBodyComponent implements OnInit {
  YEAR_REGEX = '/19[789]d|20[01]d/g';
  productDtos: ProductDto[] = [];
  manufacturers: Manufacturer[] = [];
  NUMBER_TECH_PROP = 5;

  filterDto: FilterDto;
  subCategoryId: string;

  minYear;
  maxYear;
  selectedManufacturer = -1;

  listOptions: Options[] = [];
  constructor(
    private route: ActivatedRoute,
    private filterService: FilterService,
    private modalService: NgbModal,
    private productService: ProductService,
    private manufacturerService: ManufacturerService
  ) {}

  ngOnInit() {
    this.subCategoryId = this.route.snapshot.paramMap.get('subCategoryId');

    this.getFilterDto(this.subCategoryId);
    this.getProductDtos(this.subCategoryId);
    this.getManufacturers(this.subCategoryId);
  }

  getManufacturers(id) {
    this.manufacturerService
      .getManufacturersBySubCategoryid(id)
      .subscribe(response => (this.manufacturers = response));
  }

  getFilterDto(id) {
    this.filterService
      .getFilterSentDtoBySubCategoryId(id)
      .subscribe(response => {
        this.filterDto = response;

        // ! For Year
        this.minYear = this.filterDto.TypePropsListValuesDtos.find(
          tp => tp.Name === 'Model Year'
        ).ListValues[0];
        this.maxYear = this.filterDto.TypePropsListValuesDtos.find(
          tp => tp.Name === 'Model Year'
        ).ListValues[1];

        // ! For Tech
        for (let i = 0; i < this.NUMBER_TECH_PROP; i++) {
          const options: Options = {
            floor: this.filterDto.TechPropsMinMaxValueDtos[i].MinValue,
            ceil: this.filterDto.TechPropsMinMaxValueDtos[i].MaxValue,
            step: 1
          };
          this.listOptions.push(options);
        }
      });
  }

  getProductDtos(id) {
    this.productService
      .getProductDtosWithSubCategoryid(id)
      .subscribe(response => (this.productDtos = response));
  }

  onSave() {
    this.productDtos = [];
    // ! Update TypeProp
    this.filterDto.TypePropsListValuesDtos.find(
      tp => tp.Name === 'Model Year'
    ).ListValues[0] = this.minYear.toString();
    this.filterDto.TypePropsListValuesDtos.find(
      tp => tp.Name === 'Model Year'
    ).ListValues[1] = this.maxYear.toString();

    // ! Update Manufacturer
    if (this.selectedManufacturer !== -1) {
      this.filterDto.Manufacturers = this.manufacturers.filter(
        m => m.Id.toString() === this.selectedManufacturer.toString()
      );
    } else {
      this.filterDto.Manufacturers = this.manufacturers;
    }

    this.filterService
      .getProductDtosByFilterDto(this.filterDto)
      .subscribe(response => {
        this.productDtos = response;
      });
  }

  onClear() {
    this.filterDto.TypePropsListValuesDtos = [];
    this.filterDto.TechPropsMinMaxValueDtos = [];
    this.filterDto.Manufacturers = [];
    this.listOptions = [];
    this.selectedManufacturer = -1;

    this.getFilterDto(this.subCategoryId);
  }

  onMore() {
    const modalRef = this.modalService.open(FilterModalComponent, {
      size: 'lg',
      backdrop: 'static'
    });

    modalRef.componentInstance.subCategoryId = this.subCategoryId;
    modalRef.componentInstance.clickevent.subscribe(filterDto => {
      this.filterService
        .getProductDtosByFilterDto(filterDto)
        .subscribe(response => {
          this.productDtos = response;
        });
    });
  }
}
