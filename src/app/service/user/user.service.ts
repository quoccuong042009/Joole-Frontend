import { AuthService } from './auth.service';
import { TOKEN_NAME, USER_URL } from './../../app.constant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private cookieService: CookieService,
    private httpClient: HttpClient,
    private authService: AuthService,
    private route: Router
  ) {}

  register(username, email, password, image) {
    const url = `${USER_URL}/${'register'}`;
    const body = {
      Username: username,
      Email: email,
      Password: password,
      Image: image
    };

    return this.httpClient.post(url, body);
  }

  loggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logOut() {
    this.cookieService.delete(TOKEN_NAME);
    this.route.navigate(['']);
  }

  getUserByUsername(username) {
    const url = `${USER_URL}/${'username'}/` + username;
    return this.httpClient.get(url);
  }
}
