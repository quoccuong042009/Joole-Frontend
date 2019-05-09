import { Component } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RegisterFormModalComponent } from './register-form-modal/register-form-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Joole-FE';
  constructor(private modalService: NgbModal) {
  }

  openFormModal() {
    const modalRef = this.modalService.open(RegisterFormModalComponent);

    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
}
