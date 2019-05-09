import { Injectable } from '@angular/core';
import { TOKEN_NAME, USER_URL } from './../../app.constant';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private cookieService: CookieService,
        private jwtHelperService: JwtHelperService,
        private httpClient: HttpClient) { }

    setToken(token) {
        this.cookieService.set(TOKEN_NAME, token);
    }

    getToken(): string {
        return this.cookieService.get(TOKEN_NAME);
    }

    isAuthenticated(): boolean {
        return !this.jwtHelperService.isTokenExpired(this.getToken());
    }

    logIn(username, password) {
        const url = `${USER_URL}/${'login'}`;
        const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        return this.httpClient.post(url, body, httpOptions);
    }
}
