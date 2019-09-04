import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ServicioModel } from '../model/Servicio.model';
import config from '../../config.js';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = config.local+"/Servicios";
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

formData : ServicioModel;
  constructor(private http: HttpClient) { }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getServicios (): Observable<ServicioModel[]> {
    return this.http.get<ServicioModel[]>(apiUrl)
      .pipe(
        tap(heroes => catchError(this.handleError('getServices', []))
      ));
  }

  getServicio(id: number): Observable<ServicioModel> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<ServicioModel>(url).pipe(
      tap(_ => catchError(this.handleError<ServicioModel>(`getService id=${id}`))
    ));
  }


}


