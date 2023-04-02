import { StorageService } from './storage.service';
import { Cart } from '../model/cart';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { notNullNorUndefined } from 'src/app/shared/util';
import { Product } from '../model/product';
import { CartLine } from '../model/cart-line';

@Injectable()
export class ShoppingService {
  constructor(private readonly _storage: StorageService) {}

  public readonly amountChanged = new BehaviorSubject<number>(1);
  public readonly amountChanged$ = this.amountChanged.asObservable();

  public readonly addProduct = (product: Product, amount: number = 1): void => {
    const cart = this.retrieveCart();
    const item = cart.lines.find((line: CartLine) => line.product.id === product.id);
    const line = new CartLine(product, amount);
    if (notNullNorUndefined(item)) {
      item.amount += amount;
    } else {
      line.product = product;
      line.amount = amount;
      cart.lines.push(line);
    }
    cart.recalculate();
    this.store(cart);
  };

  public readonly retrieveCart = (): Cart => {
    const cart = new Cart();
    const storedCart = this._storage.getCart();
    storedCart && cart.updateCart(JSON.parse(storedCart));
    return cart;
  };

  public readonly empty = (): void => {
    const newCart = new Cart();
    newCart.deliveryPrice = 0;
    this._storage.storeCart(newCart);
    this.amountChanged.next(1);
  };

  public readonly store = (cart: Cart): void => {
    this._storage.storeCart(cart);
    this.amountChanged.next(1);
  };

  public readonly increment = (cartLine: CartLine): void => {
    const cart = this.retrieveCart();
    cart.lines.find((line: CartLine) => line.product.id === cartLine.product.id).amount++;
    this._updateCart(cart);
  };

  public readonly decrement = (cartLine: CartLine): void => {
    const cart = this.retrieveCart();
    const targetCartLine = cart.lines.find(line => line.product.id === cartLine.product.id);
    targetCartLine.amount--;
    this._updateCart(cart);
    if (targetCartLine.amount < 1) {
      this.remove(targetCartLine);
    }
  };

  public readonly remove = (cartLine: CartLine): void => {
    const cart = this.retrieveCart();
    const index = cart.lines.findIndex((line: CartLine) => line.product.id === cartLine.product.id);
    cart.lines.splice(index, 1);
    this._updateCart(cart);
  };

  public readonly _updateCart = (cart: Cart): void => {
    cart.recalculate();
    this.store(cart);
    this.amountChanged.next(1);
  };
}
