import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import { Skill } from 'src/app/core/models/skill.model';
import { Discipline } from 'src/app/core/models/discipline.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { DisciplineService } from 'src/app/core/services/discipline/discipline.service';
import { SkillService } from 'src/app/core/services/skill/skill.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Project } from 'src/app/core/models/project.model';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { Collaborator } from 'src/app/core/models/collaborator.model';
import { CollaboratorService } from 'src/app/core/services/collaborator/collaborator.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.less']
})
export class CreateProjectComponent implements OnInit {

  //disciplines//
  disciplineCtrl = new FormControl();
  filteredDisciplines: Observable<string[]>;
  filteredOptionsDisciplines!: Observable<string[]>;
  createFormDisci: FormGroup;
  myDisciplines: string[] =[];
  allDisciplinesName: string[] = [];
  allDisci!: Discipline[];
  myDisciplineUpdate: Discipline[] = [];
  myControlDiscipline = new FormControl();

  //skills//
  createFormSkills: FormGroup
  filteredOptionsSkills!: Observable<string[]>;
  myControlSkill = new FormControl();
  skillCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  mySkills: string[] =[];
  allSkillsName: string[] = [];
  allSkills!: Skill[];
  mySkillUpdate: Skill[] = [];
  ///collaborators//

  createFormCollab: FormGroup
  filteredOptionsCollab!: Observable<string[]>;
  myControlCollab = new FormControl();
  collabCtrl = new FormControl();
  filteredCollab: Observable<string[]>;
  myCollabs: string[] =[];
  allCollabsName: string[] = [];
  allCollabs!: Collaborator[];
  myCollabUpdate: Collaborator[] = [];


  public createProject!: FormGroup;
  public state: string = 'Open';
  public project!: Project
  public _id!: string | null;
  public selectable = true;
  public removable = true;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
 
  @ViewChild('disciplineInput') disciplineInput!: ElementRef<HTMLInputElement>;
  @ViewChild('skillInput') skillInput!: ElementRef<HTMLInputElement>;
  @ViewChild('collabInput') collabInput!: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private formBuilderDisci: FormBuilder,
    private formBuilderSkills: FormBuilder,
    private formBuilderCollab: FormBuilder,
    public disciplineService: DisciplineService,
    public skillService: SkillService,
    public collaboratorService: CollaboratorService, 
    private projectService: ProjectService
    
    ) {
    (
      this.createProject = this.formBuilder.group({
      
        title: ['', Validators.required ],
        content: ['', Validators.required],       
        finishDate: ['', Validators.required]
    }),
    {
    
  
    });
    
    //Disciplines//
    this.filteredDisciplines = this.disciplineCtrl.valueChanges.pipe(
      startWith(null),
      map((discipline: string | null) => discipline ? this._filterDiscipline(discipline) : this.allDisciplinesName.slice())
    );
    this.createFormDisci = this. formBuilderDisci.group({
    
      idDisciplines: ['']
    })
    this.fetchDisciplines();
    

    //skills//
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filterSkill(skill) : this.allSkillsName.slice())
    );
    
    this.createFormSkills = this.formBuilderSkills.group({
          
      idSkills: ['']
    })
    this.fetchSkills();

    this.filteredCollab = this.collabCtrl.valueChanges.pipe(
      startWith(null),
      map((collab: string | null) => collab ? this._filterCollab(collab) : this.allCollabsName.slice())
    );
    
    this.createFormCollab = this.formBuilderCollab.group({
          
      idCollabs: ['']
    })
    this.fetchCollab();
  }
  ngOnInit() {
    //form group
    this.filteredOptionsDisciplines = this.myControlDiscipline.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDiscipline(value))
    );

    this.filteredOptionsSkills = this.myControlSkill.valueChanges.pipe(
      startWith(''),
      map(value => this._filterSkill(value))
    );
    
    this.filteredOptionsCollab = this.myControlCollab.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCollab(value))
    );
    
  }


  get title() {
    return this.createProject?.get('title')?.value;
  }
  get content() {
    return this.createProject?.get('content')?.value;
  }
  get finishDate() {
    return this.createProject?.get('finishDate')?.value;
  }
  
  async onSubmit() {
    for(let disciName of this.myDisciplines){
      let discipline = this.allDisci.find(discipline => discipline.name === disciName)
      this.myDisciplineUpdate.push(discipline!)
    } 

    for(let skillName of this.mySkills){
      let skill = this.allSkills.find(skill => skill.name === skillName)
      this.mySkillUpdate.push(skill!)
    }

    for(let collabName of this.myCollabs){
      let collab = this.allCollabs.find(collab => collab.name === collabName)
      this.myCollabUpdate.push(collab!)
    }

    let project: Partial<Project> = {
      title:  this.title,
      content: this.content,
      finishDate: this.finishDate,
      state: this.state,
      idDisciplines: this.myDisciplineUpdate,
      idSkills: this.mySkillUpdate
    }
    console.log(project)
    
    try {
      console.log(project);
      
      await this.projectService.registNewProject(project).toPromise();
     
    } catch (error) {
      console.log('error');

    }
  }

  ///////////////////////////discicplines function //////////////////////////////////////
  async fetchDisciplines() {
    try {
      this.allDisci = await this.disciplineService.getallDiscipline().toPromise()
      console.log(this.allDisci);
      for(let discipline of this.allDisci){
        this.allDisciplinesName.push(discipline.name);
      }
      console.log(this.allDisciplinesName);

    } catch (error) {
      console.log('algo malo ha ocurrido');
    }
  }

  addDiscipline(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.myDisciplines.push(value);
    }
    event.chipInput!.clear();

    this.disciplineCtrl.setValue(null);
  }

  removeDiscipline(discipline: string): void {
    const index = this.myDisciplines.indexOf(discipline);

    if (index >= 0) {
      this.myDisciplines.splice(index, 1);
    }
  }

  selectedDiscipline(event: MatAutocompleteSelectedEvent): void {
    this.myDisciplines.push(event.option.viewValue);
    this.disciplineInput.nativeElement.value = '';
    this.disciplineCtrl.setValue(null);
  }

  private _filterDiscipline(value: string): string[]{
    const filterValue = value.toLowerCase();
  
    return this.allDisciplinesName.filter(discipline => discipline.toLowerCase().includes(filterValue));
  }

  /////////////////////////skills function///////////////////////////
  async fetchSkills() {
    try {
      this.allSkills = await this.skillService.getallSkill().toPromise()
      console.log(this.allSkills);
      for(let skill of this.allSkills){
        this.allSkillsName.push(skill.name);
      }
      console.log(this.allSkillsName);
      
      
      
    } catch (error) {
      console.log('algo malo ha ocurrido');
    }
  }


  addSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.mySkills.push(value);
    }
    event.chipInput!.clear();

    this.skillCtrl.setValue(null);
  }

  removeSkill(skill: string): void {
    const index = this.mySkills.indexOf(skill);

    if (index >= 0) {
      this.mySkills.splice(index, 1);
    }
  }

  selectedSkill(event: MatAutocompleteSelectedEvent): void {
    this.mySkills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
  }

  private _filterSkill(value: string): string[]{
    const filterValue = value.toLowerCase();
  
    return this.allSkillsName.filter(skill => skill.toLowerCase().includes(filterValue));
  }
  

/////////////////////////////////function collaborator////////////////////////////   
  async fetchCollab() {
    try {
      this.allCollabs = await this.collaboratorService.getallCollaborator().toPromise()
      console.log(this.allCollabs);
      for(let collab of this.allCollabs){
        this.allCollabsName.push(collab.name + collab.lastName);
      }
      console.log(this.allCollabsName);
    } catch (error) {
      console.log('algo malo ha ocurrido');
    }
  }


  addCollab(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.myCollabs.push(value);
    }
    event.chipInput!.clear();

    this.collabCtrl.setValue(null);
  }

  removeCollab(collab: string): void {
    const index = this.myCollabs.indexOf(collab);

    if (index >= 0) {
      this.myCollabs.splice(index, 1);
    }
  }

  selectedCollabs(event: MatAutocompleteSelectedEvent): void {
    this.myCollabs.push(event.option.viewValue);
    this.collabInput.nativeElement.value = '';
    this.collabCtrl.setValue(null);
  }

  private _filterCollab(value: string): string[]{
    const filterValue = value.toLowerCase();
  
    return this.allCollabsName.filter(collab => collab.toLowerCase().includes(filterValue));
  }
}
