import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Product } from 'src/app/model/product';
import { EmptyClass } from 'src/app/shared/mixin/base';
import { TrackByProduct } from 'src/app/shared/mixin/track-by/product';
import { UnsubscribeMixin } from 'src/app/shared/mixin/unsubscribe';
import { ProductRepository } from '../../../service/repository/product.repository';

@Component({
  templateUrl: './update-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateProductComponent extends TrackByProduct(UnsubscribeMixin(EmptyClass)) implements OnInit {
  public updating = false;
  public productToUpdate: Product;
  public filteredProducts: Product[];
  private _searchString: string;
  public readonly fastSearch = new FormControl('');

  private _products: Product[];

  constructor(private readonly _repository: ProductRepository) {
    super();
  }

  ngOnInit(): void {
    this._products = this._repository.getProducts();
    this.filteredProducts = this._products;

    this.fastSearch.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTerm: string) => of(searchTerm)),
        map((searchTerm: string) => this._filterProducts(searchTerm)),
        tap((filteredProducts: Product[]) => (this.filteredProducts = filteredProducts)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  private readonly _filterProducts = (searchString: string): Product[] => {
    this._searchString = searchString;
    return searchString == null || searchString.trim() === ''
      ? this._products
      : this._products.filter((it: Product) => this._filterBy(it.name) || this._filterBy(it.id) || this._filterBy(it.price));
  };

  private readonly _filterBy = (field: string | number): boolean => field.toString().toLowerCase().includes(this._searchString.toLowerCase());

  public readonly switchMode = (): boolean => (this.updating = !this.updating);

  public readonly updateProduct = (): void => {
    this._repository.update$(
      new Product(
        this.productToUpdate.name,
        this.productToUpdate.price,
        this.productToUpdate.description,
        this.productToUpdate.quantity,
        this.productToUpdate.imagePath,
        this.productToUpdate.id
      )
    );
  };
}
