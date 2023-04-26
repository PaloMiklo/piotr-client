import { Injectable } from '@angular/core';
import { decode, encode } from 'js-base64';
import { take, tap } from 'rxjs';
import { IBillingAddress, IShippingAddress } from '../model/address';
import { Cart } from '../model/cart';
import { IConfig } from '../model/config';
import { ICustomer } from '../model/customer';
import {
  TCartStorage,
  TDeliveryMethodStorage,
  TWithExpiration,
} from '../model/storage';
import { assert, isEmpty } from '../shared/util';
import { ConfigService } from './config.service';

@Injectable()
export class StorageService {
  public readonly CART_KEY = 'cart';
  public readonly CUSTOMER_KEY = 'customer';
  public readonly SHIPPING_KEY = 'shippingaddress';
  public readonly BILLING_KEY = 'billingaddress';
  public readonly COMMENT_KEY = 'comment';
  public readonly PERPAGE_KEY = 'perpage';
  public readonly SELECTED_KEY = 'selectedpage';
  public readonly DELIVERY_KEY = 'deliverymethod';

  public STORAGE_EXPIRATION: string;

  constructor(private readonly _config: ConfigService) {
    this._config.ready$
      .pipe(
        tap(
          (conf: IConfig) =>
            (this.STORAGE_EXPIRATION = conf.storageExpiration.replace(
              /^"(.*)"$/,
              '$1'
            ))
        ),
        take(1)
      )
      .subscribe();
  }

  public readonly clear = (): void => localStorage.clear();

  public readonly storeCart = (cart: Cart): void => {
    assert(!!cart || !isEmpty(cart), 'Cart must be defined!');
    const {
      cartPrice,
      deliveryOption,
      deliveryPrice,
      expires,
      freeShipping,
      itemCount,
      lines,
    } = this._withExpiration(cart);

    this._set(this.CART_KEY, {
      cartPrice,
      deliveryOption,
      deliveryPrice,
      expires,
      freeShipping,
      itemCount,
      lines,
    });
  };

  public readonly storeCustomer = (customer: ICustomer): void => {
    assert(!!customer || !isEmpty(customer), 'Customer must be defined!');
    this._set(this.CUSTOMER_KEY, this._withExpiration(customer));
  };

  public readonly storeShipping = (shipping: IShippingAddress): void => {
    assert(!!shipping || !isEmpty(shipping), 'Shipping must be defined!');
    this._set(this.SHIPPING_KEY, this._withExpiration(shipping));
  };

  public readonly storeBilling = (billing: IBillingAddress): void => {
    assert(!!billing || !isEmpty(billing), 'Billing must be defined!');
    this._set(this.BILLING_KEY, this._withExpiration(billing));
  };

  public readonly storeComment = (comment: Record<'message', string>): void => {
    assert(!!comment, 'Comment must be defined!');
    this._set(this.COMMENT_KEY, this._withExpiration(comment));
  };

  public readonly storeDeliveryMethod = (methodId: number): void =>
    this._set(
      this.DELIVERY_KEY,
      this._withExpiration({
        id: methodId.toString(),
      } as TDeliveryMethodStorage)
    );

  public readonly storePerPage = (perPage: number): void =>
    this._set(this.PERPAGE_KEY, perPage.toString());

  public readonly storeSelectedPage = (selected: number): void =>
    this._set(this.SELECTED_KEY, selected.toString());

  public readonly getCart = (): TCartStorage =>
    this._get(this.CART_KEY) as TCartStorage;

  public readonly getCustomer = (): string => this._get(this.CUSTOMER_KEY);

  public readonly getShipping = (): string => this._get(this.SHIPPING_KEY);

  public readonly getBilling = (): string => this._get(this.BILLING_KEY);

  public readonly getComment = (): string => this._get(this.COMMENT_KEY);

  public readonly getPerPage = (): number => +this._get(this.PERPAGE_KEY);

  public readonly getSelectedPage = (): string => this._get(this.SELECTED_KEY);

  public readonly getDeliveryMethod = (): TDeliveryMethodStorage =>
    this._get(this.DELIVERY_KEY) as TDeliveryMethodStorage;

  public readonly clearItemsWithExpirations = (): void => {
    const itemsWithExpiration = [
      this.CART_KEY,
      this.CUSTOMER_KEY,
      this.SHIPPING_KEY,
      this.BILLING_KEY,
      this.COMMENT_KEY,
      this.DELIVERY_KEY,
    ];
    for (let i = 0; i < itemsWithExpiration.length; i++) {
      const curr = itemsWithExpiration[i];
      let storedItem: unknown & TWithExpiration = this._get(curr);
      if (
        storedItem &&
        storedItem.expires &&
        new Date().getTime() > storedItem.expires
      ) {
        localStorage.removeItem(curr);
      }
    }
  };

  public readonly clearItemsWithoutExpirations = (): void => {
    const itemWithoutExpiration = [this.PERPAGE_KEY, this.SELECTED_KEY];
    for (let i = 0; i < itemWithoutExpiration.length; i++) {
      const curr = itemWithoutExpiration[i];
      this._get(curr) && localStorage.removeItem(curr);
    }
  };

  private readonly _get = <T = unknown>(key: string): T => {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(decode(item));
  };

  private readonly _set = (key: string, value: unknown): void =>
    localStorage.setItem(key, encode(JSON.stringify(value)));

  private readonly _withExpiration = <T = unknown>(
    data: T
  ): T & TWithExpiration => ({
    ...data,
    expires: new Date().getTime() + +this.STORAGE_EXPIRATION,
  });
}
