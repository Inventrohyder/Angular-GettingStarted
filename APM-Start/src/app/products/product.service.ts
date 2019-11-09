import { Injectable } from "@angular/core";
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    private productsUrl = 'api/products/products.json';

    constructor(private http: HttpClient){

    }

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productsUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse){
        // In a real world app, we may send the server to some remote logging infrastracture
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent){
            // A client-side or network error occured. Handle it accordingly.
            errorMessage = `An error occured: ${err.error.message}`
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }

}