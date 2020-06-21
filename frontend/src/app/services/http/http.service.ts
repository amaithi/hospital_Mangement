import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError as observableThrowError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getData(source: string) {
    return this.http.get(source).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  }
  getPatient(source: string) {
    return this.http.get(source).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  }
  lastappintment(source: string) {
    return this.http.get(source).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  }
  pendingPatient(source: string) {
    return this.http.get(source).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  }
  approvepatient(source: string) {
    return this.http.get(source).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  }
  getpayment(source: string) {
    return this.http.get(source).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  }
  addPayment(source: string,req) {
    return this.http.post(source,req).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  };
  addDoctorProf(source: string,req) {
    return this.http.post(source,req).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  };
  signupAPI(source: string,req) {
    return this.http.post(source,req).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  };
  postCall(source: string,req) {
    return this.http.post(source,req).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  };
  getdoctors(source: string) {
    return this.http.get(source).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  };
  sendpaymentsms(url,req){
    return this.http.post(url,req).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  }
  deleteAppointment(source: string,req) {
    return this.http.post(source,req).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  };
  addPatient(source: string,req) {
    return this.http.post(source,req).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  };
  updatePatient(source: string,req) {
    return this.http.post(source,req).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  }
  saveProf(source: string,req) {
    return this.http.post(source,req).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  }
  profileupdate(source: string,req) {
    return this.http.post(source,req).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  }
  private handleError(error: any) {
    return observableThrowError(error.error || 'Server error');
  }
}
