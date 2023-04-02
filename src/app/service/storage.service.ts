import { Injectable } from '@angular/core';
import { IBillingAddress, IShippingAddress } from '../model/address';
import { Cart } from '../model/cart';
import { IPageOption } from '../model/config';
import { ICustomer } from '../model/customer';

@Injectable()
export class StorageService {
  public readonly CART_KEY = 'cart';
  public readonly SHIPPING_KEY = 'shipping address';
  public readonly BILLING_KEY = 'billing address';
  public readonly CUSTOMER_KEY = 'customer';
  public readonly COMMENT_KEY = 'comment';
  public readonly PERPAGE_KEY = 'per page';
  public readonly SELECTED_KEY = 'selected page';
  public readonly DELIVERY_KEY = 'delivery method';

  public readonly clear = (): void => localStorage.clear();

  public readonly storeCart = (cart: Cart): void => localStorage.setItem(this.CART_KEY, JSON.stringify(cart));

  public readonly storeCustomer = (customer: ICustomer): void => localStorage.setItem(this.CUSTOMER_KEY, JSON.stringify(customer));

  public readonly storeShipping = (shipping: IShippingAddress): void => localStorage.setItem(this.SHIPPING_KEY, JSON.stringify(shipping));

  public readonly storeBilling = (billing: IBillingAddress): void => localStorage.setItem(this.BILLING_KEY, JSON.stringify(billing));

  public readonly storeComment = (comment: string): void => localStorage.setItem(this.COMMENT_KEY, JSON.stringify(comment));

  public readonly storePerPage = (perPage: number): void => localStorage.setItem(this.PERPAGE_KEY, perPage.toString());

  public readonly storeSelectedPage = (selected: number): void => localStorage.setItem(this.SELECTED_KEY, selected.toString());

  public readonly storeDeliveryMethod = (methodId: number): void => localStorage.setItem(this.DELIVERY_KEY, methodId.toString());

  public readonly getCart = (): string => localStorage.getItem(this.CART_KEY);

  public readonly getCustomer = (): string => localStorage.getItem(this.CUSTOMER_KEY);

  public readonly getShipping = (): string => localStorage.getItem(this.SHIPPING_KEY);

  public readonly getBilling = (): string => localStorage.getItem(this.BILLING_KEY);

  public readonly getComment = (): string => localStorage.getItem(this.COMMENT_KEY);

  public readonly getPerPage = (): number => +localStorage.getItem(this.PERPAGE_KEY);

  public readonly getSelectedPage = (): string => localStorage.getItem(this.SELECTED_KEY);

  public readonly removeBilling = (): void => localStorage.removeItem(this.BILLING_KEY);

  public readonly getDeliveryMethod = (): string => localStorage.getItem(this.DELIVERY_KEY);
}
