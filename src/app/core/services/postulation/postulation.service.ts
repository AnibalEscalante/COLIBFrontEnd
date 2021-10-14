import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Postulation } from '../../models/postulation.model';
import { PostulationPlus } from '../../models/postulationplus.model';

@Injectable({
  providedIn: 'root'
})
export class PostulationService {

  constructor(
    private http: HttpClient
  ) { }

  getallPostulation(): Observable<PostulationPlus[]> {
    let postulations: PostulationPlus[] = [];
    const response = this.http.get<PostulationPlus[]>(environment.baseUrl + '/Postulation/all').pipe(map((data: any) => data.message));
    response.subscribe(
      res => (postulations = res)
    );
    return response;
  }

  getPostulation(id: string): Observable<PostulationPlus> {
    return this.http.get<PostulationPlus>(environment.baseUrl + '/Postulation'+ id);
  }

  registNewPostulation(postulation: Partial<Postulation>): Observable<Postulation> {
    return this.http.post<Postulation>(environment.baseUrl + '/Postulation', postulation);
  }

  modifyPostulation(postulation: Partial<Postulation>, id: string): Observable<Postulation> {
    return this.http.patch<Postulation>(environment.baseUrl + '/Postulation'+ id, postulation);
  }

  deletePostulation(id: string): Observable<Postulation> {
    return this.http.delete<Postulation>(environment.baseUrl + '/Postulation'+ id);
  }
}
