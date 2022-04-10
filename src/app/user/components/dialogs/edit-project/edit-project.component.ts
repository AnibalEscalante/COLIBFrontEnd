import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import { Project } from 'src/app/core/models/project.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CollaboratorService } from 'src/app/core/services/collaborator/collaborator.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Collaborator } from 'src/app/core/models/collaborator.model';
import { Contact } from 'src/app/core/models/contact.model';


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.less']
})
export class EditProjectComponent implements OnInit {
  
  public selectable = true;
  public removable = true;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public createFormCollab: FormGroup
  public filteredOptionsCollab: Observable<string[]> | null;
  public myControlCollab = new FormControl();
  public collabCtrl = new FormControl();
  public filteredCollab: Observable<string[]>;
  public myCollabs: string[] =[''];
  public allCollabsName: string[] = [];
  public allCollabs: Contact[];
  public myCollabUpdate: Collaborator[] = [];



  public _id!: string | null;
  public updateProject: FormGroup;
  public project!: Project
  public userEmail!: string;
  
  @ViewChild('collabInput') collabInput!: ElementRef<HTMLInputElement>;
  
  constructor(
    public dialogRef: MatDialogRef<EditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string},
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private projectService: ProjectService,
    private formBuilderCollab: FormBuilder,
    private userService: UserService,
    private collaboratorService: CollaboratorService,
    private toastr: ToastrService
    ) {
      this._id = null;
      this.allCollabs = [];
      this.filteredOptionsCollab = null;
      
      this.updateProject = this.formBuilder.group({
        
        title: ['', [Validators.pattern('[a-zA-Z]{2,32}')]],
        content: ['',  [Validators.pattern('[a-zA-Z]{2,32}')]],       
        finishDate: ['',  [Validators.required]]
      }),
      this.filteredCollab = this.collabCtrl.valueChanges.pipe(
        startWith(null),
        map((collab: string | null) => collab ? this._filterCollab(collab) : this.allCollabsName.slice())
      );
        
      this.createFormCollab = this.formBuilderCollab.group({
        
        idCollabs: ['']
      })
      this.fetchProject();
      this.fetchCollab();
      this.allMyCollabs();
  }
  ngOnInit() {
    this.filteredOptionsCollab = this.myControlCollab.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCollab(value))
    );
  }
      
  allMyCollabs(){
    for(let collab of this.allCollabs){
      this.myCollabs.push(collab.nickName);
    }
    this.myCollabs.shift();
  }
  
  async fetchCollab() {
    this._id = this.authService.getId()
    try {
      const response: any = await this.userService.getMyContacts(this._id).toPromise()
      this.allCollabs = response.message.idContacts
      for(let collab of this.allCollabs){
        this.allCollabsName.push(collab.nickName);
      }
    } catch (error) {
      console.log('algo malo ha ocurrido');
    }
  }

   async fetchProject() {
    try {
      this._id = this.authService.getId()
      const response: any= await this.projectService.getProject(this.data.id).toPromise();
      this.project = response.message;
    }
    catch (error) {
      console.log('Algo ha salido mal');
    }
  }

  get title() {
    return this.updateProject?.get('title')?.value;
  }
  get content() {
    return this.updateProject?.get('content')?.value;
  }
  get finishDate() {
    return this.updateProject?.get('finishDate')?.value;
  }

  async onSubmit() {
    for(let collabNickName of this.myCollabs){
      let collab = this.allCollabs.find(collab => collab.nickName === collabNickName);
      let newCollab: any = await this.collaboratorService.getCollaboratorByIdUser(collab!.idUser).toPromise();
      this.myCollabUpdate.push(newCollab.message)
    }

    let project: Partial<Project> = {
      title:  this.title ? this.title : this.project.title,
      content: this.content ? this.content: this.project.content,
      finishDate: this.finishDate ? this.finishDate: this.project.finishDate,
      idCollaborators: this.myCollabUpdate
    }

    try {
      await this.projectService.modifyProject(project, this.data.id).toPromise();
      this.toastr.success("se ha modificado el proyecto", "", {
        "positionClass": "toast-bottom-center",
      });
    } catch (error) {
      console.log('error');

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
