import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { CartComponent } from './cart.component';
import { ListComponent } from './list/list.component';
import { SummaryComponent } from './summary/summary.component';

const routes = [{ path: '', component: CartComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [CartComponent, ListComponent, SummaryComponent],
})
export class CartModule {}
