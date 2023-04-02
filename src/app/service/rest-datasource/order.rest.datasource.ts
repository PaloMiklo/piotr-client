import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { ClientError } from 'src/app/model/error';
import { ConfigService } from 'src/app/service/config.service';
import { handleError } from 'src/app/shared/util';
import { IConfig, MocksKeys } from '../../model/config';
import { Order } from '../../model/order';
import { MockService } from '../mock.service';

@Injectable()
export class OrderRestDataSource {
  private _baseUrl: string;

  constructor(private readonly _http: HttpClient, private readonly _config: ConfigService, private readonly _mock: MockService) {
    this._config.ready$
      .pipe(
        tap((conf: IConfig) => (this._baseUrl = `${conf.protocol}://${location.hostname}:${conf.port}/${conf.apiVersion}/api`)),
        take(1)
      )
      .subscribe();
  }

  public readonly getOrders$ = (): Observable<Order[] | ClientError> =>
    this._mock
      .computeSource<Order[]>(this._http.get<Order[]>(`${this._baseUrl}/orders`), MocksKeys.ORDERS)
      .pipe(catchError((err: Error) => handleError('getOrders', err.message)));

  public readonly getDeletedOrders$ = (): Observable<Order[] | ClientError> =>
    this._mock
      .computeSource<Order[]>(this._http.get<Order[]>(`${this._baseUrl}/orders/deleted`), MocksKeys.ORDERS)
      .pipe(catchError((err: Error) => handleError('getDeletedOrder', err.message)));

  public readonly sendOrder$ = (order: Order): Observable<number | ClientError> =>
    this._mock
      .computeSource<number>(this._http.post<number>(`${this._baseUrl}order`, order), MocksKeys.MOCK_SEND_ORDER)
      .pipe(catchError((err: Error) => handleError('sendOrder', err.message)));
}
