import { Product } from './product';

export class CartLine {
  constructor(public product: Product, public amount: number) {}
  get lineTotal(): number {
    return this.amount * this.product.price;
  }
}
