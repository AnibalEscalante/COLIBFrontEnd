import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RequestC } from '../../models/requestC.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient
  ) { }

  getallRequest(): Observable<RequestC[]> {
    let request: RequestC[] = [];
    const response = this.http.get<RequestC[]>(environment.baseUrl + '/requestC/all').pipe(map((data: any) => data.message));
    response.subscribe(
      res => (request = res)
    );
    return response;
  }

  getRequest(id: string): Observable<RequestC> {
    return this.http.get<RequestC>(environment.baseUrl + '/requestC/'+ id);
  }

  registNewRequest(idUserSender: string,idProject: string, idReceiver: string): Observable<RequestC> {
    return this.http.post<RequestC>(environment.baseUrl + '/requestC', {idUserSender, idProject, idReceiver});
  }

  registNewRequestReply(idUserSender: string,idProject: string, idReceiver: string, state: string): Observable<RequestC> {
    return this.http.post<RequestC>(environment.baseUrl + '/requestC/reply', {idUserSender, idProject, idReceiver, state});
  }

  registNewRequestReplyRejected(idUserSender: string,idProject: string, idReceiver: string, state: string): Observable<RequestC> {
    return this.http.post<RequestC>(environment.baseUrl + '/requestC/reply/rejected', {idUserSender, idProject, idReceiver, state});
  }

  modifyRequest(request: Partial<RequestC>, id: string): Observable<RequestC> {
    return this.http.patch<RequestC>(environment.baseUrl + '/requestC'+ id, request);
  }

  deleteRequest(id: string, idUserSender: string): Observable<RequestC> {
    return this.http.delete<RequestC>(environment.baseUrl + '/requestC/'+ id + '/' + idUserSender);
  }
  deleteRequestResult(id: string, idUserSender: string): Observable<RequestC> {
    return this.http.delete<RequestC>(environment.baseUrl + '/requestC/reply/'+ id + '/' + idUserSender);
  }
}
