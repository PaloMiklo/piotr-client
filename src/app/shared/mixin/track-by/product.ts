import { Product } from 'src/app/model/product';

export function TrackByProduct(BaseClass: any) {
  return class extends BaseClass {
    public readonly trackByProduct = (index: number, item: Product): number => (item.id ? item.id : index);
  };
}
