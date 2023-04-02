import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-deleted-orders',
  templateUrl: './deleted-orders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeletedOrdersComponent {}
