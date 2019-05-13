import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterService } from './../service/filter/filter.service';
import { FilterSendDto } from './../model/FilterSendDto';

import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {
  // pattern="/19[789]\d|20[01]\d/g"
  NUMBER_TECH_PROP = 5;

  filterSendDto: FilterSendDto;
  subCategoryId: string;

  minYear;
  maxYear;
  selectedManufacturer = -1;

  listOptions: Options[] = [];
  constructor(
    private route: ActivatedRoute,
    private filterService: FilterService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.subCategoryId = this.route.snapshot.paramMap.get('subCategoryId');

    this.getFilterSendDto(this.subCategoryId);
  }

  getFilterSendDto(id) {
    this.filterService
      .getFilterSentDtoBySubCategoryId(id)
      .subscribe(response => {
        this.filterSendDto = response;

        // ! For Year
        this.minYear = this.filterSendDto.TypePropsListValuesDtos.find(
          tp => tp.Name === 'Model Year'
        ).ListValues[0];
        this.maxYear = this.filterSendDto.TypePropsListValuesDtos.find(
          tp => tp.Name === 'Model Year'
        ).ListValues[1];

        // ! For Tech
        for (let i = 0; i < this.NUMBER_TECH_PROP; i++) {
          const options: Options = {
            floor: this.filterSendDto.TechPropsMinMaxValueDtos[i].MinValue,
            ceil: this.filterSendDto.TechPropsMinMaxValueDtos[i].MaxValue,
            step: 1
          };
          this.listOptions.push(options);
        }
      });
  }

  onSave() {
    // ! Update TypeProp
    this.filterSendDto.TypePropsListValuesDtos.find(
      tp => tp.Name === 'Model Year'
    ).ListValues[0] = this.minYear.toString();
    this.filterSendDto.TypePropsListValuesDtos.find(
      tp => tp.Name === 'Model Year'
    ).ListValues[1] = this.maxYear.toString();

    // ! Update Manufacturer
    if (this.selectedManufacturer !== -1) {
      console.log(this.selectedManufacturer);
      this.filterSendDto.Manufacturers = this.filterSendDto.Manufacturers.filter(
        m => m.Id.toString() === this.selectedManufacturer.toString()
      );
    }

    console.log(this.filterSendDto);
  }

  onClear() {
    this.filterSendDto.TypePropsListValuesDtos = [];
    this.filterSendDto.TechPropsMinMaxValueDtos = [];
    this.filterSendDto.Manufacturers = [];
    this.listOptions = [];
    this.selectedManufacturer = -1;

    this.getFilterSendDto(this.subCategoryId);
  }

  onMore() {
    const modalRef = this.modalService.open(FilterModalComponent, {
      size: 'lg',
      backdrop: 'static'
    });

    modalRef.componentInstance.subCategoryId = this.subCategoryId;
  }
}
