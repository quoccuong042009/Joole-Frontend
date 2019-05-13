import { FrontPageBodyComponent } from './front-page/front-page-body/front-page-body.component';
import { ProductDetailsComponent } from './front-page/product-details/product-details.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'front-page',
    component: FrontPageComponent,
    children: [
      {
        path: 'products/:categoryId/:subCategoryId',
        component: FrontPageBodyComponent
      },
      {
        path: 'product-details/:productId',
        component: ProductDetailsComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
