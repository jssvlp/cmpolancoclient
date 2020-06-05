import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { ForoModel } from '../model/foro.model';
import config from '../../config.js';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = config.api+"/PublicacionForo";

@Injectable({
  providedIn: 'root'
})
export class ForoService {

  constructor(private http: HttpClient) { }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getPosts (): Observable<ForoModel[]> {
    return this.http.get<ForoModel[]>(apiUrl)
      .pipe(
        tap(heroes => catchError(this.handleError('getPost', [])))
      );
  }


  getPostsT (id: number): Observable<ForoModel[]> {
    const url = `${apiUrl}/${'GetTemas/'+id}`;
    return this.http.get<ForoModel[]>(url)
      .pipe(
        tap(heroes => catchError(this.handleError('getPost', [])))
      );
  }

  getPost(id: number): Observable<ForoModel> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<ForoModel>(url).pipe(
      tap(_ => catchError(this.handleError<ForoModel>(`getPost id=${id}`))
    ));
  }

  sendFormData(formData: any){
    var t = `${apiUrl}/${'SaveFile'}`;
    this.http.post(t, formData).subscribe((val) => {
    });
  }

  addPost(post: ForoModel){
    return this.http.post<ForoModel>(apiUrl,post,httpOptions)
    .pipe(tap((nuevoRequest: ForoModel) =>
    catchError(this.handleError<ForoModel>('addPost'))
    ));
  }

  updatePost(post: ForoModel){
    return this.http.put<ForoModel>(apiUrl +"/"+ post.publicacionID,post, httpOptions)
        .pipe(
          catchError(this.handleError('updatePost', post))
        );
  }

  deletePost (id: number): Observable<{}> {
    const url = `${apiUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
    .pipe(
    catchError(this.handleError('deletePost'))
    );
    }
  
}
