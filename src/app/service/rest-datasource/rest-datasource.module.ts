import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductRestDataSource } from '../rest-datasource/product.rest.datasource';
import { OrderRestDataSource } from './order.rest.datasource';

@NgModule({
  imports: [CommonModule],
  providers: [ProductRestDataSource, OrderRestDataSource],
})
export class RestDataSourceModule {}
