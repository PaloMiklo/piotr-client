import { Injectable } from '@angular/core';
import { AppInjector } from 'src/app/app-injector';
import { ConfigService } from 'src/app/service/config.service';
import { notNullNorUndefined } from 'src/app/shared/util';
import { CartLine } from './cart-line';
import { IDeliveryOption } from './delivery';
import { Product } from './product';

@Injectable()
export class Cart {
  public readonly lines: CartLine[] = [];

  public deliveryOption: IDeliveryOption;
  public deliveryPrice = 0;
  public freeShipping: boolean = false;

  public itemCount = 0;
  public cartPrice = 0;

  private _config: ConfigService;
  private _freeShippingAt = 0;
  private _deliveryOptions: IDeliveryOption[];

  constructor() {
    this._config = AppInjector.get(ConfigService);
    this._deliveryOptions = this._config.get('delivery') as IDeliveryOption[];
    this.deliveryOption = this._deliveryOptions[0];
    this.deliveryPrice = this._config.get('delivery')[0].price;
    this._freeShippingAt = +this._config.get('freeShipping');
  }
  s;

  public readonly addLine = (product: Product, quantity: number = 1): void => {
    const line = this.lines.find(line => line.product.id === product.id);
    notNullNorUndefined(line) ? (line.amount += quantity) : this.lines.push(new CartLine(product, quantity));
    this.recalculate();
  };

  public readonly updateCart = (source: Cart) => Object.assign(this, { ...source });

  public readonly updateQuantity = (product: Product, quantity: number): void => {
    const line = this.lines.find((line: CartLine) => line.product.id === product.id);
    if (!notNullNorUndefined(line)) {
      line.amount = quantity;
    }
    this.recalculate();
  };

  public readonly removeLine = (id: number): void => {
    const index = this.lines.findIndex(line => line.product.id === id);
    this.lines.splice(index, 1);
    this.recalculate();
  };

  public readonly recalculate = (): number => {
    this.itemCount = 0;
    this.cartPrice = 0;
    this.lines.forEach((line: CartLine) => {
      this.itemCount += line.amount;
      this.cartPrice += line.amount * line.product.price;
    });
    this._freeShippingCheck();
    return (this.cartPrice += this.deliveryPrice);
  };

  private readonly _freeShippingCheck = (): void => {
    if (this.cartPrice > this._freeShippingAt) {
      this.freeShipping = true;
      this.deliveryPrice = 0;
    } else {
      this.deliveryPrice = this.deliveryOption.price;
      this.freeShipping = false;
    }
  };
}
