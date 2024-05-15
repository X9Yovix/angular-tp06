import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private BASE_URL = "https://jsonplaceholder.typicode.com"

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  constructor(private httpClient: HttpClient) { }

  errorHandler(error: any) {
    let errorMessage = ""
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message
    } else {
      errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`
    }
    return throwError(() => errorMessage)
  }

  getAll(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + "/posts/")
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(id: number): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + "/posts/" + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(post: Post): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + "/posts/", JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(id: number, post: Post): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + "/posts/" + id, JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: number) {
    return this.httpClient
      .delete(this.BASE_URL + "/posts/" + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

}
