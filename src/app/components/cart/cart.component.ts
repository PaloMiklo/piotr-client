import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { CartLine } from 'src/app/model/cart-line';
import { EmptyClass } from 'src/app/shared/mixin/base';
import { TrackByCartline } from 'src/app/shared/mixin/track-by/cart-line';
import { ShoppingService } from '../../service/shopping.service';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent extends TrackByCartline(EmptyClass) implements OnInit {
  private cart: Cart;
  public cartLines: CartLine[];

  constructor(private readonly _shopping: ShoppingService) {
    super();
  }

  ngOnInit(): void {
    this._updateCartLines();
  }

  public readonly updateCartLines = () => this._updateCartLines();

  private readonly _updateCartLines = (): void => {
    this.cart = this._shopping.retrieveCart();
    this.cartLines = this.cart.lines;
    this.cart.recalculate();
    this._shopping.amountChanged.next(1);
  };
}
