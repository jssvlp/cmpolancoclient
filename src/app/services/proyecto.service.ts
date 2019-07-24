import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { ProyectoModel } from '../model/Proyecto.model';
import { Observable, of } from 'rxjs';
import config from '../../config.js';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = config.api+"/proyectos";

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  formData : ProyectoModel;

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProjects(): Observable<ProyectoModel[]> {
    return this.http.get<ProyectoModel[]>(apiUrl)
      .pipe(
        tap(heroes => catchError(this.handleError('getProjects', []))
      ));
  }

  getProject(id: number): Observable<ProyectoModel> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<ProyectoModel>(url).pipe(
      tap(_ => catchError(this.handleError<ProyectoModel>(`getProject id=${id}`))
    ));
  }
}
