import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { BlogModel } from './../model/Blog.model';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:61756/api/blog";

@Injectable({
  providedIn: 'root'
})

export class BlogService {
  list: BlogModel [];

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

  sendFormData(formData: any){
    var t = `${apiUrl}/${'SaveFile'}`;
    this.http.post(t, formData).subscribe((val) => {
    });
  }

  refreshList(){
    this.http.get(apiUrl)
    .toPromise().then(res => this.list = res as BlogModel[]);
  }

  addPost(post: BlogModel){
    return this.http.post<BlogModel>(apiUrl,post,httpOptions)
    .pipe(tap((nuevoPost: BlogModel) => catchError(this.handleError<BlogModel>('addPost'))
    ));
  }

  deletePost (id: number): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
    .pipe(
    catchError(this.handleError('deletePost'))
    );
    }

    updatePost (blog: BlogModel): Observable<BlogModel> {
      return this.http.put<BlogModel>(apiUrl +"/"+ blog.blogID,blog, httpOptions)
        .pipe(
          catchError(this.handleError('updateBlog', blog))
        );
    }
  

}
