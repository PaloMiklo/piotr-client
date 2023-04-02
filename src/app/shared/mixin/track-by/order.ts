import { Order } from '../../../../app/model/order';

export function TrackByOrder(BaseClass: any) {
  return class extends BaseClass {
    public readonly trackByOrder = (index: number, item: Order): number => item.id ?? index;
  };
}
