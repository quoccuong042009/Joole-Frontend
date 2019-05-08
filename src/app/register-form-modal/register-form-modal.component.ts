import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-form-modal',
  templateUrl: './register-form-modal.component.html',
  styleUrls: ['./register-form-modal.component.css']
})
export class RegisterFormModalComponent implements OnInit {
  // @Input()id: number;
  // myForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
  }

  // private createForm() {
  //   this.myForm = this.formBuilder.group({
  //     username: '',
  //     password: ''
  //   });
  // }
  // private submitForm() {
  //   this.activeModal.close(this.myForm.value);
  // }
}
