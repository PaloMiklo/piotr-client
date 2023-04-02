import { Injectable } from '@angular/core';
import { delay, of, Subject, take, tap } from 'rxjs';
import { v4 } from 'uuid';
import { AlertType, ALERT_TIMEOUT_ON_OFF, IAlertContent } from '../config/alert.config';

@Injectable()
export class AlertService {
  public readonly display = new Subject<IAlertContent>();
  public readonly display$ = this.display.asObservable();

  public readonly success = (mssg: string): void => {
    const uuid = v4();
    of(v4())
      .pipe(
        tap(() => this.display.next(this._contentFactory(mssg, AlertType.SUCCESS, uuid))),
        delay(ALERT_TIMEOUT_ON_OFF),
        tap(() => this.display.next(this._contentFactory(mssg, AlertType.SUCCESS, uuid))),
        take(1)
      )
      .subscribe();
  };

  public readonly error = (mssg: string): void => {
    const uuid = v4();
    of([])
      .pipe(
        tap(() => this.display.next(this._contentFactory(mssg, AlertType.ERROR, uuid))),
        delay(ALERT_TIMEOUT_ON_OFF),
        tap(() => this.display.next(this._contentFactory(mssg, AlertType.ERROR, uuid))),
        take(1)
      )
      .subscribe();
  };

  public readonly info = (mssg: string): void => {
    const uuid = v4();
    of([])
      .pipe(
        tap(() => this.display.next(this._contentFactory(mssg, AlertType.INFO, uuid))),
        delay(ALERT_TIMEOUT_ON_OFF),
        tap(() => this.display.next(this._contentFactory(mssg, AlertType.INFO, uuid))),
        take(1)
      )
      .subscribe();
  };

  private readonly _contentFactory = (mssg: string, type: AlertType, uuid: string): IAlertContent => ({ mssg, type, uuid });
}
