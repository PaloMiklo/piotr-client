import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil, tap } from 'rxjs/operators';
import { Product } from 'src/app/model/product';
import { ProductRepository } from 'src/app/service/repository/product.repository';
import { EmptyClass } from 'src/app/shared/mixin/base';
import { UnsubscribeMixin } from 'src/app/shared/mixin/unsubscribe';
import { ShoppingService } from '../../../service/shopping.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent extends UnsubscribeMixin(EmptyClass) implements OnInit, OnDestroy {
  public activatedProduct: Product;
  public activatedProductLoaded: boolean;
  public productId: number;
  public products: Product[];
  public closeResult: string;
  public modalOptions: NgbModalOptions;

  constructor(
    private readonly _modal: NgbModal,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _shopping: ShoppingService,
    private readonly _repository: ProductRepository
  ) {
    super();
    this._route.params.pipe(tap((params: Params) => (this.productId = +params.id), takeUntil(this.unsubscribe$))).subscribe();
  }

  ngOnInit(): void {
    this.products = this._repository.getProducts();
    this.activatedProduct = this.products.filter((product: Product) => product.id === this.productId)[0];
    this.activatedProductLoaded = true;
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  public readonly open = (content: unknown) => this._modal.open(content);

  public readonly addProductToCart = (): void => {
    const product: Product = this.products.find((p: Product) => p.id === this.activatedProduct.id);
    this._shopping.addProduct(product);
    this._router.navigateByUrl('/cart');
  };
}
