import { TypePropsListValuesDto } from './../../model/TypePropsListValuesDto';
import { FilterSendDto } from './../../model/FilterSendDto';
import { TechPropsMinMaxValueDto } from './../../model/TechPropsMinMaxValueDto';
import { FilterService } from './../../service/filter/filter.service';
import { Component, OnInit, Input } from '@angular/core';
import { Options } from 'ng5-slider';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.css']
})
export class FilterModalComponent implements OnInit {
  @Input() public subCategoryId;

  filterSendDto: FilterSendDto;
  typePropsListValuesDtosWithoutYear: TypePropsListValuesDto[] = [];

  minYear;
  maxYear;
  selectedManufacturer = -1;
  selectedTypeValue: string[] = [];

  ListOptions: Options[] = [];

  constructor(
    public modal: NgbActiveModal,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    this.getFilterSendDto(this.subCategoryId);
  }

  getFilterSendDto(id) {
    this.filterService
      .getFilterSentDtoBySubCategoryId(id)
      .subscribe(response => {
        this.filterSendDto = response;

        // ! For Type
        this.typePropsListValuesDtosWithoutYear = this.filterSendDto.TypePropsListValuesDtos.filter(
          t => t.Name !== 'Model Year'
        );
        for (const t of this.typePropsListValuesDtosWithoutYear) {
          this.selectedTypeValue.push(t.ListValues[0]);
        }

        // ! For Year
        this.minYear = this.filterSendDto.TypePropsListValuesDtos.find(
          tp => tp.Name === 'Model Year'
        ).ListValues[0];
        this.maxYear = this.filterSendDto.TypePropsListValuesDtos.find(
          tp => tp.Name === 'Model Year'
        ).ListValues[1];

        // ! For Tech
        for (const techPropsMinMaxValueDto of this.filterSendDto
          .TechPropsMinMaxValueDtos) {
          const options: Options = {
            floor: techPropsMinMaxValueDto.MinValue,
            ceil: techPropsMinMaxValueDto.MaxValue,
            step: 1
          };
          this.ListOptions.push(options);
        }
      });
  }

  onSave() {
    console.log(this.selectedTypeValue);
  }
}
