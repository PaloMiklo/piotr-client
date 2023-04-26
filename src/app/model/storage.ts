import { Cart } from './cart';

export type TCartStorage = Pick<Cart, 'cartPrice' | 'deliveryOption' | 'deliveryPrice' | 'freeShipping' | 'itemCount' | 'lines'> & {
  expires: number;
};

export type TDeliveryMethodStorage = Record<'id', string>;

export type TWithExpiration = { expires: number };
