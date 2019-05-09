import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

import { RegisterFormModalComponent } from './register-form-modal/register-form-modal.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        private modalService: NgbModal,
        private cookieService: CookieService
    ) { }

    ngOnInit() {
    }

    openFormModal() {
        const modalRef = this.modalService.open(RegisterFormModalComponent);

        modalRef.result.then((result) => {
        console.log(result);
        }).catch((error) => {
        console.log(error);
        });
    }

    OnLogin() {
        this.cookieService.set( 'Test', 'Hello World' );
    }
}
