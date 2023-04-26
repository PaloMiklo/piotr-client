import { IBillingAddress, IShippingAddress } from './address';
import { ICustomer } from './customer';
import { TCartStorage } from './storage';

export class Order {
  constructor(
    public products: TCartStorage,
    public customer: ICustomer,
    public shipping: IShippingAddress,
    public billing: IBillingAddress,
    public createdFE: string,
    public comment: string,
    public id?: number
  ) {}
}
