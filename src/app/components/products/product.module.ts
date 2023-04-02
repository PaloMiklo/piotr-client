import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from 'src/app/components/products/products.component';
import { CounterDirective } from 'src/app/directive/counter.directive';
import { RepositoryModule } from 'src/app/service/repository/repository.module';
import { Cart } from '../../model/cart';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: ':id',
    loadChildren: () => import('./product-detail/product-detail.module').then(m => m.ProductDetailModule),
  },
];

@NgModule({
  declarations: [ProductsComponent, CounterDirective],
  imports: [CommonModule, RouterModule.forChild(routes), RepositoryModule],
  providers: [Cart],
})
export class ProductModule {}
