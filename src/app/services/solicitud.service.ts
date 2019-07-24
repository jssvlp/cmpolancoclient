import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SolicitudModel } from '../model/Solicitud.model';
import { ServicioSolicitudModel } from '../model/ServicioSolicitud.model';
import { EntidadModel } from '../model/Entidad.model';
import config from '../../config.js';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = config.local+"/Solicitud";

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getSolicitud(id: number): Observable<SolicitudModel> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<SolicitudModel>(url).pipe(
      tap(_ => catchError(this.handleError<SolicitudModel>(`getRequest id=${id}`))
    ));
  }

  getServSol(id: number): Observable<ServicioSolicitudModel>{
    const url = `${apiUrl}/${'ServicioSolicitud/'+id}`;
    return this.http.get<ServicioSolicitudModel>(url)
    .pipe(tap(_ => catchError(this.handleError<ServicioSolicitudModel>(`getRequest`))
    ));
  }

  addSolicitud(solicitud: SolicitudModel){
    return this.http.post<SolicitudModel>(apiUrl,solicitud,httpOptions)
    .pipe(tap((nuevoRequest: SolicitudModel) => console.log(solicitud),
    catchError(this.handleError<SolicitudModel>('addRequest'))
    ));
  }

  addServicioSolicitud(solicitud: EntidadModel){
    var t = `${apiUrl}/${'ServicioSolicitud'}`;
    return this.http.post<EntidadModel>(t, solicitud,httpOptions)
    .pipe(tap((nuevoRequest: EntidadModel) => catchError(this.handleError<EntidadModel>('addRequest'))
    ));
  }

  updateServSol(ServicioSolicitud: ServicioSolicitudModel){
    const url = `${apiUrl}/${'ServicioSolicitud'}`;
    return this.http.put<ServicioSolicitudModel>(url +"/"+ ServicioSolicitud.solicitud.solicitudID,ServicioSolicitud, httpOptions)
        .pipe(
          catchError(this.handleError('updateServSol', ServicioSolicitud))
        );
  }

  

}
