import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Discipline } from '../../models/discipline.model';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {

  
  constructor(
    private http: HttpClient
  ) { }

   getallDiscipline(): Observable<Discipline[]> {
    let disciplines: Discipline[] = [];
    const response = this.http.get<Discipline[]>(environment.baseUrl + '/discipline/all').pipe(map((data: any) => data.message));
    response.subscribe(
      res => (disciplines = res)
    );
    return response;
  }

 getDiscipline(id: string): Observable<Discipline> {
    return this.http.get<Discipline>(environment.baseUrl + '/discipline/'+ id);
  }
}
