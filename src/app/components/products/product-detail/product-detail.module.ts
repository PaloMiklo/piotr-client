import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepositoryModule } from 'src/app/service/repository/repository.module';
import { ProductDetailComponent } from './product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailComponent,
  },
];

@NgModule({
  declarations: [ProductDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes), RepositoryModule],
})
export class ProductDetailModule {}
