import { UserService } from './service/user/user.service';
import { Component } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(
        private cookieService: CookieService,
        private userService: UserService) {
    }

    IsLoggedin() {
        return this.userService.loggedIn();
    }
}
