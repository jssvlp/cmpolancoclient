import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { CategoriaModel } from '../model/categoria.model';
import config from '../../config.js';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = config.local+"/TemasForo";


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



  getTemas (): Observable<CategoriaModel[]> {
    return this.http.get<CategoriaModel[]>(apiUrl)
      .pipe(
        tap(heroes => catchError(this.handleError('getTemas', [])))
      );
  }
}
