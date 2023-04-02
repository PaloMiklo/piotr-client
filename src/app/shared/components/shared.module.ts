import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CounterComponent } from 'src/app/components/cart/summary/counter/counter.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CounterComponent],
  exports: [CounterComponent],
})
export class SharedModule {}
