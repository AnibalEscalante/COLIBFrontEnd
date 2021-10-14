import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient
  ) { }

  getallRequest(): Observable<Request[]> {
    let request: Request[] = [];
    const response = this.http.get<Request[]>(environment.baseUrl + '/Request/all').pipe(map((data: any) => data.message));
    response.subscribe(
      res => (request = res)
    );
    return response;
  }

  getRequest(id: string): Observable<Request> {
    return this.http.get<Request>(environment.baseUrl + '/Request'+ id);
  }

  registNewRequest(request: Partial<Request>): Observable<Request> {
    return this.http.post<Request>(environment.baseUrl + '/Request', request);
  }

  modifyRequest(request: Partial<Request>, id: string): Observable<Request> {
    return this.http.patch<Request>(environment.baseUrl + '/Request'+ id, request);
  }

  deleteRequest(id: string): Observable<Request> {
    return this.http.delete<Request>(environment.baseUrl + '/Request'+ id);
  }
}
