import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { CheckoutComponent } from './checkout.component';
import { CustomerDataComponent } from './customer-data/customer-data.component';

const routes: Routes = [{ path: '', component: CheckoutComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [CustomerDataComponent, CheckoutComponent],
})
export class CheckoutModule {}
