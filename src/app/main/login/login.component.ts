import { AuthService } from './../../service/user/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RegisterFormModalComponent } from './register-form-modal/register-form-modal.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    invalidEmail: boolean;
    invalidPassword: boolean;
    wrongEmailOrPassword: boolean;

    constructor(
        private modalService: NgbModal,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.loginForm = new FormGroup({
            username: new FormControl('', [
                Validators.required
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8)
            ])
        });
    }

    openFormModal() {
        const modalRef = this.modalService.open(RegisterFormModalComponent);

        modalRef.result.then((result) => {
        console.log(result);
        }).catch((error) => {
        console.log(error);
        });
    }

    onLogin() {
        this.invalidEmail = false;
        this.invalidPassword = false;
        this.wrongEmailOrPassword = false;

        if (!this.loginForm.valid) {
            if (!this.loginForm.get('username').valid) {
                this.invalidEmail = true;
            }
            if (!this.loginForm.get('password').valid) {
                this.invalidPassword = true;
            }
        } else {
            const username = this.loginForm.get('username').value.toString();
            const password = this.loginForm.get('password').value.toString();

            this.authService.logIn(username, password)
                .subscribe(
                    result => {
                        if (result) {
                            this.authService.setToken(result);
                        } else {
                            this.wrongEmailOrPassword = true;
                        }
                    },
                    error => {
                        this.wrongEmailOrPassword = true;
                    }
                );
        }
    }
}
