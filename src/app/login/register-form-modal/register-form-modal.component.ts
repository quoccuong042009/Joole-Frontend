import { AuthService } from './../../service/user/auth.service';
import { UserService } from './../../service/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IMAGE_PREFIX } from './../../app.constant';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-register-form-modal',
  templateUrl: './register-form-modal.component.html',
  styleUrls: ['./register-form-modal.component.css']
})
export class RegisterFormModalComponent implements OnInit {
    public imagePath;
    imgURL: any = './assets/Images/Users/holder.png';
    public message: string;

    signupForm: FormGroup;

    invalidImage: boolean;
    invalidUsername: boolean;
    invalidEmail: boolean;
    existedUsername: boolean;
    invalidPassword: boolean;
    invalidRepeatPassword: boolean;

    constructor(
        public modal: NgbActiveModal,
        private userService: UserService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.signupForm = new FormGroup({
        image: new FormControl(null, [
            Validators.required
        ]),
        username: new FormControl('', [
            Validators.required
        ]),
        email: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ]),
        rpassword: new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ])
        });
    }

    preview(files) {
        if (files.length === 0) {
            return;
        }

        const mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = 'Only images are supported.';
            return;
        }

        const reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            this.imgURL = reader.result;
        };
    }

    onSignup() {
        this.invalidImage = false;
        this.invalidUsername = false;
        this.invalidEmail = false;
        this.invalidPassword = false;
        this.invalidRepeatPassword = false;
        this.existedUsername = false;

        if (!this.signupForm.valid) {
            if (!this.signupForm.get('image').valid) {
                this.invalidImage = true;
            }

            if (!this.signupForm.get('username').valid) {
                this.invalidUsername = true;
            }

            if (!this.signupForm.get('email').valid) {
                this.invalidEmail = true;
            }

            if (!this.signupForm.get('password').valid) {
                this.invalidPassword = true;

            }
            if (this.signupForm.get('password').value.toString()
            !== this.signupForm.get('rpassword').value.toString()) {
                this.invalidRepeatPassword = true;
            }
        } else {
            const image = IMAGE_PREFIX + this.imagePath[0].name;
            const username = this.signupForm.get('username').value.toString();
            const email = this.signupForm.get('email').value.toString();
            const password = this.signupForm.get('password').value.toString();
            this.userService.register(username, email, password, image)
                .subscribe(
                    response => {
                        if (response.toString() === 'Created') {
                            this.authService.logIn(username, password)
                                .subscribe(token => this.authService.setToken(token));
                        }
                    },
                    error => this.existedUsername = true
                );
        }
    }
}
