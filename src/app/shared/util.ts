import { Observable, of } from 'rxjs';
import { ClientError } from '../model/error';

export const notNullNorUndefined = (value: unknown) => value != null;

export const handleError = (operation = 'operation', errorMessage: string): Observable<ClientError> => {
  const error = new ClientError(operation, errorMessage, new Date().toISOString());
  // TODO: send the error to remote logging infrastructureƒ
  return of(error);
};
