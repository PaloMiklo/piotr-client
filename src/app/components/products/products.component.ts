import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { fadefaster } from 'src/app/animations';
import { ConfigKeys, IConfig, IPageOption } from 'src/app/model/config';
import { ProductRepository } from 'src/app/service/repository/product.repository';
import { ConfigService } from 'src/app/service/config.service';
import { EmptyClass } from 'src/app/shared/mixin/base';
import { UnsubscribeMixin } from 'src/app/shared/mixin/unsubscribe';
import { ShoppingService } from '../../service/shopping.service';
import { StorageService } from '../../service/storage.service';
import { Product } from 'src/app/model/product';
import { TrackByProduct } from 'src/app/shared/mixin/track-by/product';
import { PAGE_OPTIONS_DEFAULT } from './products.config';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadefaster],
})
export class ProductsComponent extends TrackByProduct(UnsubscribeMixin(EmptyClass)) implements OnInit, OnDestroy {
  public selectedPage: number;
  public productsReady = false;
  public productsPerPage: number;
  public pageOptions: IPageOption[];

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _config: ConfigService,
    private readonly _storage: StorageService,
    private readonly _shopping: ShoppingService,
    private readonly _repository: ProductRepository
  ) {
    super();
  }

  ngOnInit(): void {
    this._config.ready$
      .pipe(
        tap((conf: IConfig) => {
          this.productsPerPage = this._storage.getPerPage() || this._config.get(ConfigKeys.PER_PAGE_DEFAULT);
          this.selectedPage = +this._storage.getSelectedPage() > 0 ? +this._storage.getSelectedPage() : 1;
          this._storage.storeSelectedPage(this.selectedPage);
          this.pageOptions = conf.pageOptions ?? PAGE_OPTIONS_DEFAULT;
          this.productsReady = true;
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  get products(): Product[] {
    this._storage.storePerPage(this.productsPerPage);
    const pageIndex = Math.abs(this.selectedPage - 1) * this.productsPerPage;
    return this._repository.getProducts().slice(pageIndex, pageIndex + this.productsPerPage);
  }

  get pageCount(): number {
    return Math.ceil(this._repository.getProducts().length / this.productsPerPage);
  }

  public readonly changePage = (currPage = 1): void => {
    this._storage.storeSelectedPage(currPage);
    this.selectedPage = currPage;
    console.log('xxx');
  };

  public readonly changePageSize = (event: Event): void => {
    const target = event.target as HTMLSelectElement;
    const selectedOption = target.options[target.selectedIndex];
    const perPage = selectedOption.value;
    this.productsPerPage = +perPage;
    this.changePage();
  };

  public readonly onActivate = (product: Product): Promise<boolean> => this._router.navigate([product.id], { relativeTo: this._route });

  public readonly addProductIntoCart = (product: Product) => {
    this._shopping.addProduct(product);
    this._router.navigate(['cart']);
  };
}
