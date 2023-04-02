import { IDeliveryOption } from 'src/app/model/delivery';

export function TrackByDeliveryOption(BaseClass: any) {
  return class extends BaseClass {
    public readonly trackByDeliveryOption = (index: number, item: IDeliveryOption): number => item.id + index;
  };
}
