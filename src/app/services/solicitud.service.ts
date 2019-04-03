import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SolicitudModel } from '../model/Solicitud.model';
import { ServicioSolicitudModel } from '../model/ServicioSolicitud.model';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:61756/api/Solicitud";

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

  addSolicitud(solicitud: SolicitudModel){
    return this.http.post<SolicitudModel>(apiUrl,solicitud,httpOptions)
    .pipe(tap((nuevoRequest: SolicitudModel) => catchError(this.handleError<SolicitudModel>('addRequest'))
    ));
  }

  addServicioSolicitud(solicitud: ServicioSolicitudModel){
    var t = `${apiUrl}/${'ServicioSolicitud'}`;
    return this.http.post<ServicioSolicitudModel>(t, solicitud,httpOptions)
    .pipe(tap((nuevoRequest: ServicioSolicitudModel) => catchError(this.handleError<ServicioSolicitudModel>('addRequest'))
    ));
  }

}
