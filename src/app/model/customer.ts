import { IBillingAddress, IShippingAddress } from './address';
import { IBillingOptions } from './billing';
import { IDeliveryOption } from './delivery';

export interface ICustomer {
  firstname: string;
  lastname: string;
  email: string;
  deliveryOption: IDeliveryOption;
  billingOption: IBillingOptions;
  message: string;
  shippingAddress: IShippingAddress;
  billingAddress: IBillingAddress;
}
