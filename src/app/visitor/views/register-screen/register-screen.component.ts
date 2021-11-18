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
import { Discipline } from 'src/app/core/models/discipline.model';
import { SkillService } from 'src/app/core/services/skill/skill.service';
import { Skill } from 'src/app/core/models/skill.model';
import { ToastrService } from 'ngx-toastr';

export class CdkCustomStepperWithoutFormExample {}
@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.less']
})
export class RegisterScreenComponent implements OnInit {
  
  public hidePassword: boolean;
  public hideConfirmPassword: boolean;
  public firstStepFormGroup!: FormGroup;
  public secondStepFormGroup!: FormGroup;
  public thirdStepFormGroup!: FormGroup;
  public fourthStepFormGroup!: FormGroup;

  public registerForm: FormGroup;

  //////////////////////////////////////////// Vars Step 1 ////////////////////////////////////////////

  public submitted: boolean;
  public message: string;
  public isDivVisible: boolean;

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////// Vars Step 2 & 3 //////////////////////////////////////////
  public selectable: boolean;
  public removable: boolean;
  public separatorKeysCodes: number[];

  //disciplines//
  public filteredDisciplines: Observable<string[]>;
  public disciplineCtrl: FormControl;
  public filteredOptionsDisciplines!: Observable<string[]>;
  public createFormDisci: FormGroup;
  public myDisciplines: string[];
  public allDisciplinesName: string[];
  public allDisci: Discipline[];
  public myDisciplineUpdate: Discipline[];
  public myControlDiscipline: FormControl;

  //skills//
  public createFormSkills: FormGroup;
  public filteredOptionsSkills!: Observable<string[]>;
  public myControlSkill: FormControl;
  public skillCtrl : FormControl;
  public filteredSkills: Observable<string[]>;
  public mySkills: string[];
  public allSkillsName: string[];
  public allSkills: Skill[];
  public mySkillUpdate: Skill[];

  //////////////////////////////////////////// Vars Step 4 ////////////////////////////////////////////

  public imagePath: string;
  public imgURL: any;

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  
  constructor(
    private formBuilder: FormBuilder,
    private formBuilderDisci: FormBuilder,
    private formBuilderSkills: FormBuilder,
    private router: Router, 
    private AuthService : AuthService,
    private disciplineService: DisciplineService,
    private skillService: SkillService,
    private toastr: ToastrService
  ) {
    this.hidePassword = true;
    this.hideConfirmPassword = true;
    this.submitted = false;
    this.message = '';
    this.isDivVisible = false;
    this.selectable = true;
    this.removable = true;
    this.separatorKeysCodes = [ENTER, COMMA];
    this.disciplineCtrl = new FormControl();
    this.myDisciplines = [];
    this.allDisciplinesName = [];
    this.allDisci = [];
    this.myDisciplineUpdate = [];
    this.myControlDiscipline = new FormControl();
    this.myControlSkill = new FormControl();
    this.skillCtrl = new FormControl();
    this.mySkills = [];
    this.allSkillsName = [];
    this.allSkills = [];
    this.mySkillUpdate = [];
    this.imagePath = '';
    
    this.registerForm = this.formBuilder.group({
    
      nickName: ['', [Validators.required, Validators.pattern('[a-zA-Z]{2,32}')]],             
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]{2,32}')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]{2,32}')]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]],
      movilPhone: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{9}$")]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    }),
    {
        validator: this.MustMatch('password', 'confirmPassword')
    };

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
  
  getErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'Ingrese un correo electrónico';
    }
    return this.email?.invalid ? 'El dato ingresado no es un correo electónico valido' : '';
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
    
    let usuario: Partial<User & Auth> = {
      nickName: this.registerForm.get('nickName')!.value,
      name: this.registerForm.get('name')!.value,
      lastName: this.registerForm.get('lastName')!.value,
      email: this.registerForm.get('email')!.value,
      movilPhone: this.registerForm.get('movilPhone')!.value,
      password: this.registerForm.get('password')!.value,
      profileImg: this.imgURL,
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
                    usuario.profileImg!,
                    usuario.idDisciplines!,
                    usuario.idSkills!)
            .toPromise();
        this.message="registro completo";
        this.isDivVisible = true;
        delay(5000);
        this.router.navigate(['/visitor/login']);

    } catch (error) {
        this.toastr.error('Ocurrió un proplema al intentar registrarse.');
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

  @ViewChild('disciplineInput') disciplineInput!: ElementRef<HTMLInputElement>;

  @ViewChild('skillInput') skillInput!: ElementRef<HTMLInputElement>;
  
  async fetchDisciplines() {
    try {
      this.allDisci = await this.disciplineService.getallDiscipline().toPromise()
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

  public previewImg(files: any) {
    if (files.length === 0) return;
    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.toastr.warning('El documento subido solo puede ser una imagen.');      
      return;
    }
    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }
}
