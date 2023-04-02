export interface IAlertContent {
  mssg: string;
  type: AlertType;
  uuid: string;
}
export enum AlertType {
  SUCCESS = 0,
  ERROR = 1,
  INFO = 2,
}
export const ALERT_TIMEOUT_ON_OFF = 2000;
