import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Project } from '../../models/project.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient
  ) { }

 getAllProject(): Observable<Project[]> {
    let project: Project[] = [];
    const response = this.http.get<Project[]>(environment.baseUrl + '/project/all').pipe(map((data: any) => data.message));
    response.subscribe(
      res => (project = res)
    );
    return response;
  }  

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(environment.baseUrl + '/project/'+ id);
  }

  registNewProject(project: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(environment.baseUrl + '/project', project);
  }

  modifyProject(project: Partial<Project>, id: string): Observable<Project> {
    return this.http.patch<Project>(environment.baseUrl + '/project'+ id, project);
  }

  deleteProject(id: string): Observable<Project> {
    return this.http.delete<Project>(environment.baseUrl + '/project'+ id);
  } 
}
