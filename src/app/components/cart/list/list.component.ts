import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartLine } from 'src/app/model/cart-line';
import { Product } from 'src/app/model/product';
import { ShoppingService } from '../../../service/shopping.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() public cartLine: CartLine;
  @Output() public readonly editedCartLines = new EventEmitter<void>();

  constructor(private readonly _router: Router, private readonly _shopping: ShoppingService) {}

  private readonly _updateCartLines = () => this.editedCartLines.emit();

  public readonly previewProduct = (product: Product) => this._router.navigate([`/product/${product.id}`]);

  public readonly removeViaX = (cartLine: CartLine): void => {
    this._shopping.remove(cartLine);
    this._updateCartLines();
  };

  public readonly increment = (cartLine: CartLine): void => {
    this._shopping.increment(cartLine);
    this._updateCartLines();
  };

  public readonly decrement = (cartLine: CartLine): void => {
    this._shopping.decrement(cartLine);
    this._updateCartLines();
  };
}
