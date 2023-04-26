import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import { Cart } from 'src/app/model/cart';
import { ConfigService } from 'src/app/service/config.service';
import { EmptyClass } from 'src/app/shared/mixin/base';
import { UnsubscribeMixin } from 'src/app/shared/mixin/unsubscribe';
import { ShoppingService } from '../../../../service/shopping.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent extends UnsubscribeMixin(EmptyClass) implements OnInit, OnDestroy {
  public cart: Cart;
  constructor(public readonly config: ConfigService, private readonly _shopping: ShoppingService, private readonly _cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this._refreshCart();
    this._shopping.amountChanged$
      .pipe(
        tap((_: number) => {
          this.cart = this._refreshCart();
          this._cdRef.detectChanges();
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  private readonly _refreshCart = () => (this.cart = this._shopping.retrieveCart());
}
