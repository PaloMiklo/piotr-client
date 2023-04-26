import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, takeUntil, tap } from 'rxjs';
import { IBillingAddress, IShippingAddress } from 'src/app/model/address';
import { Cart } from 'src/app/model/cart';
import { IConfig } from 'src/app/model/config';
import { ICustomer } from 'src/app/model/customer';
import { IDeliveryOption } from 'src/app/model/delivery';
import { Order } from 'src/app/model/order';
import { TCartStorage } from 'src/app/model/storage';
import { ConfigService } from 'src/app/service/config.service';
import { EmptyClass } from 'src/app/shared/mixin/base';
import { TrackByDeliveryOption } from 'src/app/shared/mixin/track-by/delivery-option';
import { UnsubscribeMixin } from 'src/app/shared/mixin/unsubscribe';
import { ShoppingService } from '../../service/shopping.service';
import { StorageService } from '../../service/storage.service';

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent
  extends TrackByDeliveryOption(UnsubscribeMixin(EmptyClass))
  implements OnInit, OnDestroy
{
  public baseSubmitted = false;
  public shippingSubmitted = false;
  public bilingSubmitted = false;
  public commentSubmitted = false;
  public form: FormGroup;
  public optionId = 1;
  public deliveryOptions: IDeliveryOption[];

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _storage: StorageService,
    private readonly _shopping: ShoppingService,
    private readonly _configService: ConfigService
  ) {
    super();
    this._configService.ready$
      .pipe(
        tap(
          (conf: IConfig) => (this.deliveryOptions = conf.delivery),
          takeUntil(this.unsubscribe$)
        )
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.form = this._fb.group({ message: [null, Validators.required] });
    this._checkDeliveryMethod();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  private readonly _checkDeliveryMethod = (): void => {
    const currMethod = this._storage.getDeliveryMethod();
    this.optionId ??= +currMethod.id ?? 0;
  };

  public readonly setDelivery = (option: IDeliveryOption): void => {
    this.optionId = option.id;
    const cart = this._shopping.retrieveCart();
    cart.deliveryOption = option;
    cart.deliveryPrice = option.price;
    cart.recalculate();
    this._shopping.store(cart);
    this._storage.storeDeliveryMethod(this.optionId);
  };

  public readonly submitBase = (): boolean =>
    (this.baseSubmitted = !this.baseSubmitted);

  public readonly shipping = (): boolean =>
    (this.shippingSubmitted = !this.shippingSubmitted);

  public readonly billing = (): boolean =>
    (this.bilingSubmitted = !this.bilingSubmitted);

  public readonly comment = (): void => {
    this.commentSubmitted = !this.commentSubmitted;
    this._storage.storeComment(this.form.value);
  };

  public readonly sendOrder$ = (): Observable<Order> => {
    const [
      cart,
      customer,
      shipping,
      billing,
      comment,
      datetime,
      deliveryOption,
    ] = [
      this._storage.getCart(),
      this._storage.getCustomer(),
      this._storage.getShipping(),
      this._storage.getBilling(),
      this._storage.getComment(),
      new Date().toISOString(),
      this._storage.getDeliveryMethod(),
    ].map((it: string) => JSON.parse(it ?? '')) as [
      TCartStorage,
      ICustomer,
      IShippingAddress,
      IBillingAddress,
      string,
      string,
      IDeliveryOption
    ];

    const order = new Order(
      Object.assign({}, cart, deliveryOption),
      customer,
      shipping,
      billing,
      datetime,
      comment
    );

    return of(order).pipe(
      tap(() => {
        console.log(order);
        this._storage.clear();
      })
    );
  };
}
