import { IBillingAddress, IShippingAddress } from './address';
import { Cart } from './cart';
import { ICustomer } from './customer';

export class Order {
  constructor(
    public products: Cart,
    public customer: ICustomer,
    public shipping: IShippingAddress,
    public billing: IBillingAddress,
    public createdFE: string,
    public comment: string,
    public id?: number
  ) {}
}
