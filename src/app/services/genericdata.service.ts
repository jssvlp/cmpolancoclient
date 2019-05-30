import { Injectable } from '@angular/core';
import { GenericData } from './../model/GenericData.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:61756/api/DatosGenericos";
@Injectable({
  providedIn: 'root'
})
export class GenericdataService {

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAllGenericData (): Observable<GenericData[]> {
    return this.http.get<GenericData[]>(apiUrl)
      .pipe(
        tap(heroes => catchError(this.handleError('getAllGenericData', []))
      ));
  }

  getGenericDataValue(key: string): Observable<GenericData> {
    const url = `${apiUrl}/key/${key}`;
    return this.http.get<GenericData>(url).pipe(
      tap(_ => catchError(this.handleError<GenericData>(`getGenericData key=${key}`))
    ));
  }
  constructor(private http: HttpClient) { }
}
