import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { EmailModel } from '../model/email.model';
import config from '../../config.js';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = config.local+"/Emails/SendNotification";



@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  sendEmail(email: EmailModel){
    return this.http.post<EmailModel>(apiUrl,email,httpOptions)
    .pipe(tap((nuevoPost: EmailModel ) => catchError(this.handleError<EmailModel>('addPost'))
    ));
  }
}
