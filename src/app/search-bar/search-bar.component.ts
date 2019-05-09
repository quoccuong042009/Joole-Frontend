import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

    constructor( private cookieService: CookieService) { }

    ngOnInit() {
    }

    OnSearch() {
        this.cookieService.delete('Test');
    }

}
