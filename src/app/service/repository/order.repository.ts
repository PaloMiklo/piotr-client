import { Injectable, OnDestroy } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { IConfig } from 'src/app/model/config';
import { Order } from 'src/app/model/order';
import { EmptyClass } from 'src/app/shared/mixin/base';
import { UnsubscribeMixin } from 'src/app/shared/mixin/unsubscribe';
import { ConfigService } from '../config.service';
import { OrderRestDataSource } from '../rest-datasource/order.rest.datasource';

@Injectable()
export class OrderRepository extends UnsubscribeMixin(EmptyClass) implements OnDestroy {
  public orders: Order[];

  constructor(private readonly _config: ConfigService, private readonly _dataSource: OrderRestDataSource) {
    super();
    this._config.ready$
      .pipe(
        map((_: IConfig) => this._prepareContent$()),
        switchMap((orders$: Observable<Order[]>[]) => forkJoin(orders$)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public readonly getOrders = (): Order[] => this.orders;

  public readonly getOrder = (i: number) => this.orders.find((it: Order) => it.id === i);

  private readonly _prepareContent$ = (): Observable<Order[]>[] => [this._dataSource.getOrders$().pipe(tap((all: Order[]) => (this.orders = all)))];
}
