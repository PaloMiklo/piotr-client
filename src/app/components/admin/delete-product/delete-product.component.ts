import { ProductRepository } from '../../../service/repository/product.repository';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { EmptyClass } from 'src/app/shared/mixin/base';
import { TrackByProduct } from 'src/app/shared/mixin/track-by/product';

@Component({
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteProductComponent extends TrackByProduct(EmptyClass) implements OnInit {
  public filteredProducts: Product[];
  private _searchTerm: string;
  private _products: Product[];

  constructor(private readonly _repository: ProductRepository) {
    super();
  }

  ngOnInit(): void {
    this._products = this._repository.getProducts();
    this.filteredProducts = this._products;
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredProducts = this.filterProducts(value);
  }

  private readonly filterProducts = (searchString: string): Product[] =>
    this._products.filter((product: Product) => product.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);

  public readonly deleteProduct = (product: Product): void =>
    confirm('Are you sure about deleting ' + product.name) && this._repository.delete(product);
}
