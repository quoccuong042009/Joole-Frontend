import { MyInterceptor } from './auth/token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  NgbModalConfig,
  NgbModal,
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng5SliderModule } from 'ng5-slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterFormModalComponent } from './main/login/register-form-modal/register-form-modal.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LoginComponent } from './main/login/login.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { NavBarComponent } from './front-page/nav-bar/nav-bar.component';
import { ProductDetailsComponent } from './front-page/product-details/product-details.component';
import { MainComponent } from './main/main.component';
import { ProductsComponent } from './front-page/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormModalComponent,
    SearchBarComponent,
    LoginComponent,
    FrontPageComponent,
    NavBarComponent,
    ProductDetailsComponent,
    MainComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng5SliderModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('access_token');
        }
      }
    })
  ],
  entryComponents: [RegisterFormModalComponent],
  providers: [
    NgbModalConfig,
    NgbModal,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
