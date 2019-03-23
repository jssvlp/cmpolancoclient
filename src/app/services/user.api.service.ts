import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { UserModel } from '../model/User.model';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
const apiUrl = "http://localhost:61756/api/usuarios";


@Injectable({
    providedIn: 'root'
  })
export class UserApiService {
   
    constructor(private http: HttpClient, private userInfo: UserModel) { }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
      
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
      
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }


    addUser(user: UserModel){
        return this.http.post<UserModel>(apiUrl,user,httpOptions)
        .pipe(tap((nuevoUsuario: UserModel) => catchError(this.handleError<UserModel>('addUser'))
        ));
      }
      getUser(id: number): Observable<UserModel> {
        const url = `${apiUrl}/${id}`;
        return this.http.get<UserModel>(url).pipe(
          tap(_ => catchError(this.handleError<UserModel>(`getUser id=${id}`))
        ));
      }
}




