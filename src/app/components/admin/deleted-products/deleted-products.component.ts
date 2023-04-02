import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductRepository } from 'src/app/service/repository/product.repository';
import { EmptyClass } from 'src/app/shared/mixin/base';
import { TrackByProduct } from 'src/app/shared/mixin/track-by/product';

@Component({
  selector: 'app-deleted-products',
  templateUrl: './deleted-products.component.html',
  styleUrls: ['./deleted-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeletedProductsComponent extends TrackByProduct(EmptyClass) {
  constructor(private repository: ProductRepository) {
    super();
  }

  get deleted() {
    return this.repository.getDeleted();
  }
}
