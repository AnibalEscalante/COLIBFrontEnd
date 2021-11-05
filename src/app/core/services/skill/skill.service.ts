import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Skill } from '../../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(
    private http: HttpClient
  ) { }

  getallSkill(): Observable<Skill[]> {
    let skills: Skill[] = [];
    const response = this.http.get<Skill[]>(environment.baseUrl + '/skill/all').pipe(map((data: any) => data.message));
    response.subscribe(
      res => (skills = res)
    );
    return response;
  }

  getSkill(id: string): Observable<Skill> {
    return this.http.get<Skill>(environment.baseUrl + '/skill'+ id);
  }
}
