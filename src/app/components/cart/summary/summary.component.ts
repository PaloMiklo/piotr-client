import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingService } from 'src/app/service/shopping.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent {
  @Output() editedCartLines = new EventEmitter();
  constructor(private readonly _shopping: ShoppingService, private readonly _rouer: Router) {}

  private readonly updateCartLines = () => this.editedCartLines.emit();

  public readonly clear = (): void => {
    this._shopping.empty();
    this.updateCartLines();
  };
}
