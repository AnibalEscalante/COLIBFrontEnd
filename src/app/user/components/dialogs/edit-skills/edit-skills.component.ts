import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import { Skill } from 'src/app/core/models/skill.model';
import { SkillService } from 'src/app/core/services/skill/skill.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.model';
import { ActivatedRoute} from '@angular/router';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { Project } from 'src/app/core/models/project.model';


@Component({
  selector: 'app-edit-skills',
  templateUrl: './edit-skills.component.html',
  styleUrls: ['./edit-skills.component.less']
})
export class EditSkillsComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;
  updateForm: FormGroup;
  public _id!: string | null;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  mySkills: string[] =[''];
  allSkillsName: string[] = [];
  alSkills!: Skill[];
  mySkillUpdate: Skill[] = [];
  
  @ViewChild('skillInput') skillInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<EditSkillsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {skills: Skill[] , isUserProject: string, id: string},
    public skillService: SkillService,
    private userService: UserService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
        startWith(null),
        map((skill: string | null) => skill ? this._filter(skill) : this.allSkillsName.slice())
    );
    this.updateForm = this.formBuilder.group({
      
      idSkills: ['']
  })
    this.fetchSkills();
    this.allMySkills();
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    
  }
  allMySkills(){

    for(let skill of this.data.skills){
      this.mySkills.push(skill.name);
    }
    this.mySkills.shift();
  }
  
  
  
  async fetchSkills() {
    try {
      this.alSkills = await this.skillService.getallSkill().toPromise()
      for(let skill of this.alSkills){
        this.allSkillsName.push(skill.name);
      }
    } catch (error) {
      console.log('algo malo ha ocurrido');
    }
  }


  async onSubmit() {
    
    for(let skillName of this.mySkills){

      let skill = this.alSkills.find(skill => skill.name === skillName)
      this.mySkillUpdate.push(skill!)

    } 

    let user: Partial<User> = {
      idSkills: this.mySkillUpdate
    }

    let project: Partial<Project> = {
      idSkills: this.mySkillUpdate
    }

    try { 
      if (this.data.isUserProject === 'user'){
        this._id = this.authService.getId()
        await this.userService.modifyUser(user, this._id!).toPromise();
      }
      if (this.data.isUserProject === 'project'){ 
        await this.projectService.modifyProject(project, this.data.id).toPromise();
      }
    } catch (error) {
      console.log('error');

    }
   /*  window.location.reload() */
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.mySkills.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.skillCtrl.setValue(null);
  }

  remove(skill: string): void {
    const index = this.mySkills.indexOf(skill);

    if (index >= 0) {
      this.mySkills.splice(index, 1);
      /* 
      this.allSkillsName.push(skill) */
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
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

  private _filter(value: string): string[]{
    const filterValue = value.toLowerCase();
  
    return this.allSkillsName.filter(skill => skill.toLowerCase().includes(filterValue));
  }

}
