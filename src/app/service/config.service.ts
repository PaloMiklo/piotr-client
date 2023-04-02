import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take, takeUntil, tap } from 'rxjs/operators';
import { ConfigKeys, IConfig } from '../model/config';
import { EmptyClass } from '../shared/mixin/base';
import { UnsubscribeMixin } from '../shared/mixin/unsubscribe';

@Injectable()
export class ConfigService extends UnsubscribeMixin(EmptyClass) implements OnDestroy {
  private _config: IConfig;
  private readonly _configUrl = 'assets/config.json';
  private readonly _configSubject = new BehaviorSubject<IConfig>(null);

  constructor(private readonly _http: HttpClient) {
    super();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  public readonly init = (): void => {
    this._http
      .get(this._configUrl)
      .pipe(
        tap((conf: IConfig) => {
          this._config = conf;
          this._configSubject.next(conf);
        }),
        take(1)
      )
      .subscribe();
  };

  public get ready$(): Observable<IConfig> {
    return this._configSubject.asObservable().pipe(
      filter(config => !!config),
      takeUntil(this.unsubscribe$)
    );
  }

  public readonly get = <K extends keyof IConfig>(key: K): IConfig[K] => this._config && this._config[key];
}

export const configLoaderFactory = (loader: ConfigService) => (): void => loader.init();
