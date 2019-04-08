import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { BlogModel } from './../model/Blog.model';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:61756/api/blogs";

@Injectable({
  providedIn: 'root'
})

export class BlogService {
  formData : BlogModel;

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getBlogs (): Observable<BlogModel[]> {
    return this.http.get<BlogModel[]>(apiUrl)
      .pipe(
        tap(heroes => catchError(this.handleError('getBlogs', []))
      ));
  }

  getBlog(id: number): Observable<BlogModel> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<BlogModel>(url).pipe(
      tap(_ => catchError(this.handleError<BlogModel>(`getBlog id=${id}`))
    ));
  }
}
