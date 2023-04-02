import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/model/product';
import { ProductRepository } from 'src/app/service/repository/product.repository';
import { ProductRestDataSource } from 'src/app/service/rest-datasource/product.rest.datasource';

@Component({
  selector: 'app-admin-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProductComponent implements OnInit {
  public uploadForm: FormGroup;

  constructor(
    private readonly _router: Router,
    private readonly _fb: FormBuilder,
    private readonly _repository: ProductRepository,
    private readonly _productService: ProductRestDataSource
  ) {}

  public form: FormGroup;

  ngOnInit(): void {
    this.form = this._fb.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
    });
    this.uploadForm = this._fb.group({ image: [null] });
  }

  public readonly createProduct = (): void => {
    const { name, price, quantity, description } = this.form.getRawValue();
    this._repository.create$(new Product(name, price, quantity, description));
    this._router.navigateByUrl('');
    this.form.reset();
  };

  public readonly fileSelect = (event: any): void => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('image').setValue(file);
    }
  };

  public readonly saveImage = (): void => {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('image').value);

    this._productService.uploadImage$(formData, this.form.getRawValue()).pipe(take(1)).subscribe();
  };
}
