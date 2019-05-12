import { FilterService } from './../service/filter/filter.service';
import { FilterSendDto } from './../model/FilterSendDto';

import { TechPropService } from './../service/tech-prop/tech-prop.service';
import { TechPropsMinMaxValueDto } from '../model/TechPropsMinMaxValueDto';
import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css', './styled-slider.component.scss']
})
export class FrontPageComponent implements OnInit {
  // pattern="/19[789]\d|20[01]\d/g"
  NUMBER_TECH_PROP = 5;

  filterSendDto: FilterSendDto;
  subCategoryId: string;

  listOptions: Options[] = [];
  constructor(
    private route: ActivatedRoute,
    private filterService: FilterService // private techPropService: TechPropService
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
}
