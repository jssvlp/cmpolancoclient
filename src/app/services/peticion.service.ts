import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { PeticionModel } from '../model/Peticion.model';
import config from '../../config.js';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = config.api+"/Peticiones";

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  addPeticion(peticion: PeticionModel){
    return this.http.post<PeticionModel>(apiUrl,peticion,httpOptions)
    .pipe(tap((nuevoRequest: PeticionModel) => console.log(peticion),
    catchError(this.handleError<PeticionModel>('addPeticion'))
    ));
  }
}
