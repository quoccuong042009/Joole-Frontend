import { AuthService } from './../../service/user/auth.service';
import { UserService } from './../../service/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
    user;

    constructor(
        private userService: UserService,
        private authService: AuthService) { }

    ngOnInit() {
        if (this.authService.isAuthenticated()) {
            this.getUser();
        }
    }

    getUser() {
        this.userService.getUserByUsername(this.authService.getUsername())
            .subscribe(res => this.user = res);
    }

    onLogOut() {
        this.userService.logOut();
    }
}
