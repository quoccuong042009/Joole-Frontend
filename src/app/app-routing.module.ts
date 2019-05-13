import { ProductComponent } from './front-page/product/product.component';
import { FrontPageBodyComponent } from './front-page/front-page-body/front-page-body.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProductSummaryComponent } from './front-page/product/product-summary/product-summary.component';
import { ProductDetailsComponent } from './front-page/product/product-details/product-details.component';
import { ProductDocumentationComponent } from './front-page/product/product-documentation/product-documentation.component';
import { ProductContactComponent } from './front-page/product/product-contact/product-contact.component';

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
        component: ProductComponent,
        children: [
          { path: '', redirectTo: 'product-summary', pathMatch: 'full' },
          { path: 'product-summary', component: ProductSummaryComponent },
          { path: 'product-details', component: ProductDetailsComponent },
          {
            path: 'product-documentation',
            component: ProductDocumentationComponent
          },
          { path: 'product-contact', component: ProductContactComponent }
        ]
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
