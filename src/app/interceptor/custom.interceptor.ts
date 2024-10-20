import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let newHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let clone = req.clone();

    this.spinner.show(); // Show spinner before the request

    return next.handle(clone).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spinner.hide(); // Hide spinner after response
          if (event.body && !event.body.success) {
            // this.toastr.info(event.body.message, 'Info!');
          }
        }
      }),
      catchError((err: any) => {
        this.spinner.hide(); // Ensure spinner is hidden on error
        if (err instanceof HttpErrorResponse) { 
          const errorMessage = err.error.message || 'An unknown error occurred';
          this.toastr.error(errorMessage, 'Error!');
        }
        return of(err);
      })
    );
  }
}
