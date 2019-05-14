import { Manufacturer } from '../../../model/Manufacturer';
import { ManufacturerService } from '../../../service/manufacturer/manufacturer.service';
import { TypePropsListValuesDto } from '../../../model/TypePropsListValuesDto';
import { FilterDto } from '../../../model/FilterDto';
import { TechPropsMinMaxValueDto } from '../../../model/TechPropsMinMaxValueDto';
import { FilterService } from '../../../service/filter/filter.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.css']
})
export class FilterModalComponent implements OnInit {
  @Input() public subCategoryId;
  @Output() clickevent = new EventEmitter<FilterDto>();
  regexYear = new RegExp('^(199[2-9]|200[0-9]|20[0-9][0-9])$', 'i');
  invalidYears = false;

  filterDto: FilterDto;
  typePropsListValuesDtosWithoutYear: TypePropsListValuesDto[] = [];
  manufacturers: Manufacturer[] = [];

  minYear;
  maxYear;
  selectedManufacturer = -1;
  selectedTypeValue: string[] = [];

  ListOptions: Options[] = [];

  constructor(
    public modal: NgbActiveModal,
    private filterService: FilterService,
    private manufacturerService: ManufacturerService
  ) {}

  ngOnInit() {
    this.getfilterDto(this.subCategoryId);
    this.getManufacturers(this.subCategoryId);
  }

  getfilterDto(id) {
    this.filterService
      .getFilterSentDtoBySubCategoryId(id)
      .subscribe(response => {
        this.filterDto = response;

        // ! For Type
        this.typePropsListValuesDtosWithoutYear = this.filterDto.TypePropsListValuesDtos.filter(
          t => t.Name !== 'Model Year'
        );
        for (const t of this.typePropsListValuesDtosWithoutYear) {
          this.selectedTypeValue.push(t.ListValues[0]);
        }

        // ! For Year
        this.minYear = this.filterDto.TypePropsListValuesDtos.find(
          tp => tp.Name === 'Model Year'
        ).ListValues[0];
        this.maxYear = this.filterDto.TypePropsListValuesDtos.find(
          tp => tp.Name === 'Model Year'
        ).ListValues[1];

        // ! For Tech
        for (const techPropsMinMaxValueDto of this.filterDto
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

  getManufacturers(id) {
    this.manufacturerService
      .getManufacturersBySubCategoryid(id)
      .subscribe(response => (this.manufacturers = response));
  }

  onSave() {
    this.invalidYears = false;
    if (
      this.regexYear.test(this.minYear) &&
      this.regexYear.test(this.maxYear) &&
      this.minYear <= this.maxYear
    ) {
      // ! Update TypeProp
      for (let i = 0; i < this.typePropsListValuesDtosWithoutYear.length; i++) {
        this.filterDto.TypePropsListValuesDtos[i].ListValues = [
          this.selectedTypeValue[i]
        ];
      }

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

      console.log(this.filterDto);
      this.clickevent.emit(this.filterDto);
      document.getElementById('close').click();
    } else {
      this.invalidYears = true;
    }
  }
}
