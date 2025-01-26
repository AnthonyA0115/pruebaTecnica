import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class mainService {
  private API_URL = environment.api_url;

  constructor(private http: HttpClient) { }

  private _getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private baseUrl(url: string, apiUrl: string = this.API_URL) {
    return `${apiUrl}${url}`
  }

  get<T>(url: string, options?: { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> }, apiUrl?: string) {
    const params = new HttpParams({ fromObject: options })
    return this.http.get<any>(this.baseUrl(url, apiUrl), { headers: this._getHeaders(), params }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  post<T>(url: string, data?: any, options?: { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> }, apiUrl?: string) {
    const params = new HttpParams({ fromObject: options })
    return this.http.post<T>(this.baseUrl(url, apiUrl), data, { headers: this._getHeaders(), params }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  put<T>(url: string, data?: any, options?: { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> }, apiUrl?: string) {
    const params = new HttpParams({ fromObject: options })
    return this.http.put<T>(this.baseUrl(url, apiUrl), data, { headers: this._getHeaders(), params }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: any) {
    const err = new Error(error.message);
    if (error.status === 500) {
      console.log(err);
    }
    return throwError(() => error.message);
  }
}
