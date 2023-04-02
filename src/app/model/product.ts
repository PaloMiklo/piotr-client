export class Product {
  constructor(
    public name: string,
    public price: number,
    public description: string,
    public quantity: number,
    public imagePath?: string,
    public id?: number
  ) {}
}
