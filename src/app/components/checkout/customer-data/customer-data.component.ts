import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { StorageService } from 'src/app/service/storage.service';
import { ConfigService } from 'src/app/service/config.service';
import { ICustomer } from 'src/app/model/customer';
import { IBillingAddress, IShippingAddress } from 'src/app/model/address';
import { EmptyClass } from 'src/app/shared/mixin/base';
import { TrackByCountry } from 'src/app/shared/mixin/track-by/country';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerDataComponent extends TrackByCountry(EmptyClass) {
  @Output() private _baseSubmittedToggler = new EventEmitter<boolean>();
  @Output() private _shippingSubmitted = new EventEmitter<boolean>();
  @Output() private _bilingSubmitted = new EventEmitter<boolean>();

  public countries: string[];
  public justShippingAddress = true;

  public baseSubmitted = false;
  public shippingSubmitted = false;
  public billingSubmitted = false;

  constructor(private readonly _storage: StorageService, private readonly _config: ConfigService) {
    super();
    this.countries = this._config.get('countries') as string[];
  }

  public readonly base = (customer: ICustomer): void => {
    this.baseSubmitted = !this.baseSubmitted;
    this._baseSubmittedToggler.emit(this.baseSubmitted);
    this._storage.storeCustomer(customer);
  };

  public readonly setShippingAddress = (shipping: IShippingAddress): void => {
    this.shippingSubmitted = !this.shippingSubmitted;
    this._shippingSubmitted.emit(this.shippingSubmitted);
    this._storage.storeShipping(shipping);
  };

  public readonly setBillingAddress = (billing: IBillingAddress): void => {
    this.billingSubmitted = !this.billingSubmitted;
    this._bilingSubmitted.emit(this.billingSubmitted);
    this._storage.storeBilling(billing);
  };
}
