import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { ClientError } from 'src/app/model/error';
import { ConfigService } from 'src/app/service/config.service';
import { handleError } from 'src/app/shared/util';
import { IConfig, MocksKeys } from '../../model/config';
import { Product } from '../../model/product';
import { MockService } from '../mock.service';

@Injectable()
export class ProductRestDataSource {
  private _baseUrl: string;

  constructor(private readonly _http: HttpClient, private readonly _config: ConfigService, private readonly _mock: MockService) {
    this._config.ready$
      .pipe(
        tap((conf: IConfig) => (this._baseUrl = `${conf.protocol}://${location.hostname}:${conf.port}/${conf.apiVersion}/api`)),
        take(1)
      )
      .subscribe();
  }

  public readonly getProducts$ = (): Observable<Product[] | ClientError> =>
    this._mock
      .computeSource<Product[]>(this._http.get<Product[]>(`${this._baseUrl}/product`), MocksKeys.PRODUCTS)
      .pipe(catchError((err: Error) => handleError('getProducts', err.message)));

  public readonly deleteProduct$ = (productId: number): Observable<Product | ClientError> =>
    this._mock
      .computeSource<Product>(this._http.delete<Product>(`${this._baseUrl}/'product/${productId}`), MocksKeys.PRODUCT)
      .pipe(catchError((err: Error) => handleError('deleteProduct', err.message)));

  public readonly getDeleted$ = (): Observable<Product[] | ClientError> =>
    this._mock
      .computeSource<Product[]>(this._http.get<Product[]>(`${this._baseUrl}/product/deleted`), MocksKeys.PRODUCTS)
      .pipe(catchError((err: Error) => handleError('getDeleted', err.message)));

  public readonly createProduct$ = (product: Product): Observable<Product | ClientError> =>
    this._mock
      .computeSource<Product>(this._http.post<Product>(`${this._baseUrl}/product`, product), MocksKeys.PRODUCT)
      .pipe(catchError((err: Error) => handleError('createProduct', err.message)));

  public readonly updateProduct$ = (product: Product): Observable<Product | ClientError> =>
    this._mock
      .computeSource<Product>(this._http.put<Product>(`${this._baseUrl}product/${product.id}`, product), MocksKeys.PRODUCTS)
      .pipe(catchError((err: Error) => handleError('updateProduct', err.message)));

  public readonly uploadImage$ = (formData: FormData, productName: string): Observable<unknown> =>
    this._http.post<FormData>(`${this._baseUrl}/${productName}`, formData).pipe(catchError((err: Error) => handleError('uploadImage', err.message)));
}
