import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderRepository } from 'src/app/service/repository/order.repository';
import { EmptyClass } from 'src/app/shared/mixin/base';
import { TrackByOrder } from 'src/app/shared/mixin/track-by/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent extends TrackByOrder(EmptyClass) implements OnInit {
  public orders: Order[];

  constructor(private readonly _ordersRepository: OrderRepository) {
    super();
  }

  ngOnInit(): void {
    this.orders = this._ordersRepository.getOrders();
  }
}
