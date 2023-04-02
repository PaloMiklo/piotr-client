export function TrackByCountry(BaseClass: any) {
  return class extends BaseClass {
    public readonly trackByCountry = (index: number, item: string): number => index;
  };
}
