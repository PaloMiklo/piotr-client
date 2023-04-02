import { IDeliveryOption } from './delivery';
import { Order } from './order';
import { Product } from './product';

export interface IConfig {
  protocol: string;
  freeShipping: number;
  port: number;
  apiVersion: string;
  delivery: IDeliveryOption[];
  doMock: boolean;
  mocks: IMocks[];
  mockSendOrder: Order;
  perPageDefault: number;
  pageOptions: IPageOption[];
  countries: string[];
}

export interface IMocks {
  products: Product[];
  product: Product;
  orders: Order[];
  deletedProducts: Product[];
}

export interface IPageOption {
  text: string;
  value: string;
}

export enum ConfigKeys {
  PROTOCOL = 'protocol',
  FREE_SHIPPING = 'freeShipping',
  PORT = 'port',
  API_VERSION = 'apiVersion',
  DELIVERY = 'delivery',
  DO_MOCK = 'doMock',
  MOCKS = 'mocks',
  PER_PAGE_DEFAULT = 'perPageDefault',
  PAGE_OPTIONS = 'pageOptions',
  COUNTRIES = 'countries',
}

export enum MocksKeys {
  PRODUCTS = 'products',
  PRODUCT = 'product',
  ORDERS = 'orders',
  DELETED_PRODUCTS = 'deletedProducts',
  MOCK_SEND_ORDER = 'mockSendOrder',
}
