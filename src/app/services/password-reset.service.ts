import { Injectable } from '@angular/core';
import config from '../../config.js';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import PasswordResetRequest from '../model/PasswordResetRequest.model.js';
import { PasswordResetResponse } from '../model/PasswordResetResponse.model.js';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from 'firebase';
import { UserModel } from '../model/User.model.js';




const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = config.api+"/Auth/password";

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  resetPassword(request: PasswordResetRequest): Observable<any> {
    let url = apiUrl + '/reset';

    return this.http.post<PasswordResetRequest>(url, request,httpOptions)
    .pipe(tap((nuevoRequest: any) => catchError(this.handleError<any>('addRequest'))
    ));

  }

  validateToken(request: PasswordResetRequest): Observable<any> {
    let url = apiUrl + '/validate'
    return this.http.post<PasswordResetRequest>(url, request,httpOptions)
    .pipe(tap((nuevoRequest: any) => catchError(this.handleError<any>('addRequest'))
    ));
  }


  requestPasswordReset(user : any){
    let url = apiUrl + '/request'
    return this.http.post<PasswordResetRequest>(url, user,httpOptions)
    .pipe(tap((nuevoRequest: any) => catchError(this.handleError<any>('passwordRquest'))
    ));
  }
  
}
