import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-form-modal',
  templateUrl: './register-form-modal.component.html',
  styleUrls: ['./register-form-modal.component.css']
})
export class RegisterFormModalComponent implements OnInit {
    IMAGE_PREFIX = './assets/Images/Users/';

    public imagePath;
    imgURL: any = './assets/Images/Users/holder.png';
    public message: string;

    signupForm: FormGroup;

    invalidImage: boolean;
    invalidUsername: boolean;
    invalidEmail: boolean;
    existedEmail: boolean;
    invalidPassword: boolean;
    invalidRepeatPassword: boolean;

    constructor(
        public modal: NgbActiveModal
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
        console.log(files);
        if (files.length === 0) {
            return;
        }

        let mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = 'Only images are supported.';
            return;
        }

        let reader = new FileReader();
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
        this.existedEmail = false;

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
            const image = this.imgURL;
            const username = this.signupForm.get('username').value.toString();
            const email = this.signupForm.get('email').value.toString();
            const password = this.signupForm.get('password').value.toString();
            console.log(this.imagePath);
        // this.userService.signup(email,password,firstName,lastName,date)
        // .subscribe(res => {
        //   if(res.toString() === 'Created'){
        //     this.route.navigate(['login']);
        //   } else {
        //     this.existedEmail = true;
        //   }
        // });
        }
    }
}
