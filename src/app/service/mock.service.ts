import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConfigKeys, MocksKeys } from '../model/config';
import { ConfigService } from './config.service';

@Injectable()
export class MockService {
  constructor(private readonly _config: ConfigService) {}

  public readonly computeSource = <T = unknown>($: Observable<T>, key: MocksKeys): Observable<T> =>
    this._config.get(ConfigKeys.DO_MOCK) ? (of(this._config.get(ConfigKeys.MOCKS)[key]) as unknown as Observable<T>) : $;
}
