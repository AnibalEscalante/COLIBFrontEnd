import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {delay, map, startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/core/models/user.model';
import { Auth } from 'src/app/core/models/auth.model';
import { DisciplineService } from 'src/app/core/services/discipline/discipline.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Discipline } from 'src/app/core/models/discipline.model';
import { SkillService } from 'src/app/core/services/skill/skill.service';
import { Skill } from 'src/app/core/models/skill.model';

export class CdkCustomStepperWithoutFormExample {}
@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.less']
})
export class RegisterScreenComponent implements OnInit {
  hide = true;
  firstStepFormGroup!: FormGroup;
  secondStepFormGroup!: FormGroup;
  thirdStepFormGroup!: FormGroup;
  fourthStepFormGroup!: FormGroup;

  firstFormGroup!: FormGroup;

  

  registerForm!: FormGroup;
  submitted = false;
  mensaje: string = "";
  isDivVisible = false;


  constructor(
    private formBuilder: FormBuilder,
    private formBuilderDisci: FormBuilder,
    private formBuilderSkills: FormBuilder,
    private router: Router, 
    private AuthService : AuthService,
    public disciplineService: DisciplineService,
    public skillService: SkillService,

    ) {
    (
      this.registerForm = this.formBuilder.group({
      
        nickName: ['', [Validators.required, Validators.pattern('[a-zA-Z]{2,32}')]],             
        name: ['', [Validators.required, Validators.pattern('[a-zA-Z]{2,32}')]],
        lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]{2,32}')]],
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
        )]],
        movilPhone: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{9}$")]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
    }),
    {
        validator: this.MustMatch('password', 'confirmPassword')
        
    });

    this.filteredDisciplines = this.disciplineCtrl.valueChanges.pipe(
      startWith(null),
      map((discipline: string | null) => discipline ? this._filterDiscipline(discipline) : this.allDisciplinesName.slice())
    );
    this.createFormDisci = this. formBuilderDisci.group({
    
      idDisciplines: ['']
    })
    this.fetchDisciplines();
    
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filterSkill(skill) : this.allSkillsName.slice())
  );
    
    this.createFormSkills = this.formBuilderSkills.group({
          
      idSkills: ['']
    })
    this.fetchSkills();
      
  }

  ngOnInit() {

    this.filteredOptionsDisciplines = this.myControlDiscipline.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDiscipline(value))
    );

    this.filteredOptionsSkills = this.myControlSkill.valueChanges.pipe(
      startWith(''),
      map(value => this._filterSkill(value))
    );
    
    
  }

  emailReq = new FormControl('', [Validators.required, Validators.email]);

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////// Step 1///////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////


  get nickName() { return this.registerForm?.get('nickName'); }
  get name() { return this.registerForm?.get('name'); }
  get lastName() { return this.registerForm?.get('lastName'); }
  get email() { return this.registerForm?.get('email'); }
  get movilPhone() { return this.registerForm?.get('movilPhone'); }
  get password() { return this.registerForm?.get('password'); }
  get confirmPassword() { return this.registerForm?.get('confirmPassword'); }

  
  async onSubmit() {

    for(let disciName of this.myDisciplines){

      let discipline = this.allDisci.find(discipline => discipline.name === disciName)
      this.myDisciplineUpdate.push(discipline!)

    } 
    for(let skillName of this.mySkills){

      let skill = this.allSkills.find(skill => skill.name === skillName)
      this.mySkillUpdate.push(skill!)

    }
    
    
    let usuario: Partial<User & Auth> = {
        nickName: this.registerForm.get('nickName')!.value,
        name: this.registerForm.get('name')!.value,
        lastName: this.registerForm.get('lastName')!.value,
        email: this.registerForm.get('email')!.value,
        movilPhone: this.registerForm.get('movilPhone')!.value,
        password: this.registerForm.get('password')!.value,
        idDisciplines: this.myDisciplineUpdate,
        idSkills: this.mySkillUpdate
    }
    try {
        await this.AuthService.
           register(usuario.nickName!,
                    usuario.name!,
                    usuario.lastName!,
                    usuario.email!,
                    usuario.movilPhone!,
                    usuario.password!,
                    usuario.idDisciplines!,
                    usuario.idSkills!)
            .toPromise();
        this.mensaje="registro completo";
        this.isDivVisible = true;
        delay(5000);
        this.router.navigate(['/visitor/login']);

    } catch (error) {
        this.mensaje = "registro no exitoso";
        this.isDivVisible = true;
    }
  }
  
    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
  
    return() {
        this.router.navigate(['']);
    }


    MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
        
            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }     


  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////// Step 2-3/////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  getErrorMessage() {
    if (this.emailReq.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailReq.hasError('emailReq') ? 'Not a valid email' : '';
  }

  options: string[] = ['One', 'Two', 'Three'];
  
  public _id!: string | null;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
 

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

  @ViewChild('disciplineInput') disciplineInput!: ElementRef<HTMLInputElement>;

  @ViewChild('skillInput') skillInput!: ElementRef<HTMLInputElement>;
  
  async fetchDisciplines() {
    try {
      this.allDisci = await this.disciplineService.getallDiscipline().toPromise()
      console.log(this.allDisci);
      for(let discipline of this.allDisci){
        this.allDisciplinesName.push(discipline.name);
      }
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

  ///////////////skills///////////////////
  async fetchSkills() {
    try {
      this.allSkills = await this.skillService.getallSkill().toPromise()
      console.log(this.allSkills);
      for(let skill of this.allSkills){
        this.allSkillsName.push(skill.name);
      }
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
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////// Step 4///////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
}
