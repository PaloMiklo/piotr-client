import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RestDataSourceModule } from '../rest-datasource/rest-datasource.module';
import { OrderRepository } from './order.repository';
import { ProductRepository } from './product.repository';

@NgModule({
  imports: [CommonModule, RestDataSourceModule],
  providers: [OrderRepository, ProductRepository],
})
export class RepositoryModule {}
