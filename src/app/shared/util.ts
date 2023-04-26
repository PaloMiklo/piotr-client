import { Observable, of } from 'rxjs';
import { ClientError } from '../model/error';

export const notNullNorUndefined = (value: unknown) => value != null;

export const handleError = (operation = 'operation', errorMessage: string): Observable<ClientError> => {
  const error = new ClientError(operation, errorMessage, new Date().toISOString());
  // TODO: send the error to remote logging infrastructure
  return of(error);
};

export function assert(condition: unknown, msg?: string): asserts condition {
  if (condition === false) throw new Error(msg);
}

export const isEmpty = (obj: object): boolean => Object.keys(obj).length === 0;
