import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { ComentarioModel } from '../model/comentario.model';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:61756/api/ComentariosForo";



@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getComments (): Observable<ComentarioModel[]> {
    return this.http.get<ComentarioModel[]>(apiUrl)
      .pipe(
        tap(heroes => catchError(this.handleError('getPost', [])))
      );
  }

  getComment(id: number): Observable<ComentarioModel> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<ComentarioModel>(url).pipe(
      tap(_ => catchError(this.handleError<ComentarioModel>(`getPost id=${id}`))
    ));
  }

  sendFormData(formData: any){
    var t = `${apiUrl}/${'SaveFile'}`;
    this.http.post(t, formData).subscribe((val) => {
    });
  }

  addComment(comment: ComentarioModel){
    return this.http.post<ComentarioModel>(apiUrl,comment,httpOptions)
    .pipe(tap((nuevoRequest: ComentarioModel) =>
    catchError(this.handleError<ComentarioModel>('addComment'))
    ));
  }

  updateComment(comment: ComentarioModel){
    return this.http.put<ComentarioModel>(apiUrl +"/"+ comment.comentarioID,comment, httpOptions)
        .pipe(
          catchError(this.handleError('updateComment', comment))
        );
  }

  deleteComment (id: number): Observable<{}> {
    const url = `${apiUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
    .pipe(
    catchError(this.handleError('deleteComment'))
    );
    }


}
