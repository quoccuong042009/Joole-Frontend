import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { RegisterFormModalComponent } from './register-form-modal/register-form-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    RegisterFormModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    RegisterFormModalComponent
  ],
  providers: [NgbModalConfig, NgbModal],
  bootstrap: [AppComponent]
})
export class AppModule {
}
