import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Collaborator } from '../../models/collaborator.model';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  constructor(
    private http: HttpClient
  ) { }

  getCollaborator(id: string): Observable<Collaborator> {
    return this.http.get<Collaborator>(environment.baseUrl + '/collaborator/'+ id);
  }

  getallCollaborator(): Observable<[]> {
    let collaborators: Collaborator[] = [];
    const response = this.http.get<Collaborator[]>(environment.baseUrl + '/collaborator/all/').pipe(map((data: any) => data.message));
    response.subscribe(
      res => (collaborators = res)
    );
    return response;
  }
}
