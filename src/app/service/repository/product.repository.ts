import { Injectable, OnDestroy } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { ConfigService } from 'src/app/service/config.service';
import { EmptyClass } from 'src/app/shared/mixin/base';
import { UnsubscribeMixin } from 'src/app/shared/mixin/unsubscribe';
import { IConfig } from '../../model/config';
import { Product } from '../../model/product';
import { ProductRestDataSource } from '../rest-datasource/product.rest.datasource';

@Injectable()
export class ProductRepository extends UnsubscribeMixin(EmptyClass) implements OnDestroy {
  public products: Product[];
  public deletedProducts: Product[];

  constructor(protected readonly configService: ConfigService, private readonly _dataSource: ProductRestDataSource) {
    super();
    this.configService.ready$
      .pipe(
        map((_: IConfig) => this._prepareContent$()),
        switchMap((products$: Observable<Product[]>[]) => forkJoin(products$)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public readonly getProducts = (): Product[] => this.products;

  public readonly getProduct = (i: number) => this.products.find((it: Product) => it.id === i);

  public readonly delete = (product: Product) => {
    this._dataSource.deleteProduct$(product.id).pipe(take(1)).subscribe();
    const removeIndex = this.products.map((item: Product) => item.id).indexOf(product.id);
    this.products.splice(removeIndex, 1);
    this.deletedProducts.push(product);
  };

  public readonly getDeleted = () => this.deletedProducts;

  public readonly create$ = (product: Product) => this._dataSource.createProduct$(product);

  public readonly update$ = (product: Product) => this._dataSource.updateProduct$(product);

  private readonly _prepareContent$ = (): Observable<Product[]>[] => [
    this._dataSource.getProducts$().pipe(tap((all: Product[]) => (this.products = all))),
    this._dataSource.getDeleted$().pipe(tap((deleted: Product[]) => (this.deletedProducts = deleted))),
  ];
}
