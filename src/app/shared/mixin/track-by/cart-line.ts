import { CartLine } from 'src/app/model/cart-line';

export function TrackByCartline(BaseClass: any) {
  return class extends BaseClass {
    public readonly trackByCartLine = (index: number, item: CartLine): number => item.product.id + index;
  };
}
