import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RepositoryModule } from 'src/app/service/repository/repository.module';
import { AdminOutletComponent } from './admin-outlet.component';
import { AdminComponent } from './admin.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { DeletedOrdersComponent } from './deleted-orders/deleted-orders.component';
import { DeletedProductsComponent } from './deleted-products/deleted-products.component';
import { MainComponent } from './main/main.component';
import { NewProductComponent } from './new-product/new-product.component';
import { OrdersComponent } from './orders/orders.component';
import { UpdateProductComponent } from './update-product/update-product.component';
const routes: Routes = [
  {
    path: '',
    component: AdminOutletComponent,
    children: [
      {
        path: '',
        component: AdminComponent,
      },
      {
        path: 'main',
        component: MainComponent,
      },
      {
        path: 'new',
        component: NewProductComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'delete',
        component: DeleteProductComponent,
      },
      {
        path: 'delorders',
        component: DeletedOrdersComponent,
      },
      {
        path: 'delproducts',
        component: DeletedProductsComponent,
      },
      {
        path: 'updateProduct',
        component: UpdateProductComponent,
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule, RepositoryModule],
  declarations: [
    AdminOutletComponent,
    MainComponent,
    AdminComponent,
    NewProductComponent,
    OrdersComponent,
    DeleteProductComponent,
    DeletedOrdersComponent,
    DeletedProductsComponent,
    UpdateProductComponent,
  ],
})
export class AdminModule {}
