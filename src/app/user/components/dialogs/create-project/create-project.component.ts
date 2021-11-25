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
import { DisciplineService } from 'src/app/core/services/discipline/discipline.service';
import { SkillService } from 'src/app/core/services/skill/skill.service';
import { Project } from 'src/app/core/models/project.model';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/core/models/user.model';
import { Collaborator } from 'src/app/core/models/collaborator.model';
import { Contact } from 'src/app/core/models/contact.model';
import { CollaboratorService } from 'src/app/core/services/collaborator/collaborator.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.less']
})
export class CreateProjectComponent implements OnInit {

  //disciplines//
  public disciplineCtrl = new FormControl();
  public filteredDisciplines: Observable<string[]>;
  public filteredOptionsDisciplines: Observable<string[]> | null;
  public createFormDisci: FormGroup;
  public myDisciplines: string[] =[];
  public allDisciplinesName: string[] = [];
  public allDisci: Discipline[];
  public myDisciplineUpdate: Discipline[] = [];
  public myControlDiscipline = new FormControl();

  //skills//
  public createFormSkills: FormGroup
  public filteredOptionsSkills: Observable<string[]> | null;
  public myControlSkill = new FormControl();
  public skillCtrl = new FormControl();
  public filteredSkills: Observable<string[]>;
  public mySkills: string[] =[];
  public allSkillsName: string[] = [];
  public allSkills: Skill[];
  public mySkillUpdate: Skill[] = [];
  ///collaborators//

  public createFormCollab: FormGroup
  public filteredOptionsCollab: Observable<string[]> | null;
  public myControlCollab = new FormControl();
  public collabCtrl = new FormControl();
  public filteredCollab: Observable<string[]>;
  public myCollabs: string[] =[];
  public allCollabsName: string[] = [];
  public allCollabs: Contact[];
  public myCollabUpdate: Collaborator[] = [];


  public createProject: FormGroup;
  public state: string = 'Open';
  public project: Project | null;
  public myProjects: Project[];
  public user: User | null;
  public myProjectUpdate!: Project[];
  public _id: string | null;
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
    private projectService: ProjectService,
    private userService: UserService,
    private collaboratorService: CollaboratorService,
    private authService: AuthService,
    private toastr: ToastrService
    ) {
      this._id = null;
      this.user = null;
      this.myProjects = [];
      this.project = null;
      this.allCollabs = [];
      this.allSkills = [];
      this.allDisci = [];
      this.filteredOptionsCollab = null;
      this.filteredOptionsSkills = null;
      this.filteredOptionsDisciplines = null;

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
    //collabs//
    this.filteredCollab = this.collabCtrl.valueChanges.pipe(
      startWith(null),
      map((collab: string | null) => collab ? this._filterCollab(collab) : this.allCollabsName.slice())
    );
    
    this.createFormCollab = this.formBuilderCollab.group({
          
      idCollabs: ['']
    })
    this.fetchCollab();

    this.fetchUserMyProjects();
    this.fetchUser();
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
  
  async fetchUser() {
    try {
      this._id = this.authService.getId()
      const response: any= await this.userService.getUser(this._id!).toPromise();
      this.user = response.message;
    }
    catch (error) {
      console.log('Algo ha salido mal');
    }
  }
  async onSubmit() {
    for(let disciName of this.myDisciplines){
      let discipline = this.allDisci.find(discipline => discipline.name === disciName);
      this.myDisciplineUpdate.push(discipline!)
    } 

    for(let skillName of this.mySkills){
      let skill = this.allSkills.find(skill => skill.name === skillName);
      this.mySkillUpdate.push(skill!)
    }

    for(let collabNickName of this.myCollabs){
      let collab = this.allCollabs.find(collab => collab.nickName === collabNickName);
      let newCollab: any = await this.collaboratorService.getCollaboratorByIdUser(collab!.idUser).toPromise();
      this.myCollabUpdate.push(newCollab.message)
    }

    let project: Project = {
      title: this.title,
      content: this.content,
      finishDate: this.finishDate,
      state: this.state,
      idUser: this._id!,
      idDisciplines: this.myDisciplineUpdate,
      idSkills: this.mySkillUpdate,
      idCollaborators: this.myCollabUpdate
    }
    this.project = project
    this.myProjects.push(this.project)
    try {
      this._id = this.authService.getId()
      await this.projectService.registNewProject(this.project, this._id!).toPromise();
      window.location.reload();
      this.toastr.success("has credo un proyecto nuevo", "", {
        "positionClass": "toast-bottom-center",
      });
    } catch (error) {
      console.log('error');
      this.toastr.error("Algunos datos que se agergaron no existen, porfavor agrega datos existentes", "", {
        "positionClass": "toast-bottom-center",
      });

    }
  }
  
  
  async fetchUserMyProjects() {
    try {

      this._id = this.authService.getId()
      const response: any= await this.userService.getMyProjects(this._id!).toPromise();
      this.myProjects = response.message.idMyProjects
      console.log(this.myProjects);
      
    }
    catch (error) {
      console.log('Algo ha salido mal');
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
      this.allDisciplinesName.push(discipline)
    }
  }

  selectedDiscipline(event: MatAutocompleteSelectedEvent): void {
    const index = this.allDisciplinesName.indexOf(event.option.viewValue)
    for(let myNamesDisci of this.allDisciplinesName){
      if(myNamesDisci === event.option.viewValue){
        if (index >= 0){
          this.allDisciplinesName.splice(index, 1);
        }
      }
    }
    this.myDisciplines.push(event.option.viewValue);
    if (index >= 0){
      this.allDisciplinesName.splice(index, 1);
    }
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
      this.allSkillsName.push(skill)
    }
  }

  selectedSkill(event: MatAutocompleteSelectedEvent): void {
    const index = this.allSkillsName.indexOf(event.option.viewValue)
    for(let myNamesSkill of this.allSkillsName){
      if(myNamesSkill === event.option.viewValue){
        if (index >= 0){
          this.allSkillsName.splice(index, 1);
        }
      }
    }
    this.mySkills.push(event.option.viewValue);
    if (index >= 0){
      this.allSkillsName.splice(index, 1);
    }
    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
  }

  private _filterSkill(value: string): string[]{
    const filterValue = value.toLowerCase();
  
    return this.allSkillsName.filter(skill => skill.toLowerCase().includes(filterValue));
  }
  

/////////////////////////////////function collaborator////////////////////////////   
  async fetchCollab() {
    this._id = this.authService.getId()
    try {
      const response: any = await this.userService.getMyContacts(this._id).toPromise()
      this.allCollabs = response.message.idContacts
      console.log(this.allCollabs);
      for(let collab of this.allCollabs){
        this.allCollabsName.push(collab.nickName);
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
