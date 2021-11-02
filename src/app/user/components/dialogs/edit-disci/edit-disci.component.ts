import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import { DisciplineService } from 'src/app/core/services/discipline/discipline.service';
import { Discipline } from 'src/app/core/models/discipline.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';


@Component({
  selector: 'app-edit-disci',
  templateUrl: './edit-disci.component.html',
  styleUrls: ['./edit-disci.component.less']
})
export class EditDisciComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;
  updateForm: FormGroup;
  public _id!: string | null;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  disciplineCtrl = new FormControl();
  filteredDisciplines: Observable<string[]>;
  myDisciplines: string[] =[''];
  allDisciplinesName: string[] = [''];
  /* myDisci: string[] = ['biologia','matematicas','ingeniería de alimentos','ingeniería pesquera',
  'derecho','ciencias religiosas','estadística','negocios y economía','comercio',
  'trabajo social','ingeniería civil','ingeniería en construcción','ingeniería eléctrica',
  'ingeniería química','ingeniería de transporte','ingeniería industrial','ingeniería informática']; */
  allDisci!: Discipline[];
  myDisciplineUpdate: Discipline[] = [];
  
  @ViewChild('disciplineInput') disciplineInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<EditDisciComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Discipline[],
    public disciplineService: DisciplineService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.filteredDisciplines = this.disciplineCtrl.valueChanges.pipe(
        startWith(null),
        map((discipline: string | null) => discipline ? this._filter(discipline) : this.allDisciplinesName.slice())
    );
    this.updateForm = this.formBuilder.group({
      
      idDisciplines: ['']
  })
    this.fetchDisciplines();
    this.allMyDisciplines();
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    
  }
  allMyDisciplines(){

    for(let discipline of this.data){
      this.myDisciplines.push(discipline.name);
    }
    this.myDisciplines.shift();
    console.log(this.myDisciplines)
  }
  
  
  
  async fetchDisciplines() {
    try {
      this.allDisci = await this.disciplineService.getallDiscipline().toPromise()
      console.log(this.allDisci);
      for(let discipline of this.allDisci){
        this.allDisciplinesName.push(discipline.name);
      }
      this.allDisciplinesName.shift();
      console.log(this.allDisciplinesName);
      console.log(this.data);
      
      
      
    } catch (error) {
      console.log('algo malo ha ocurrido');
    }
  }


  async onSubmit() {
    
    for(let disciName of this.myDisciplines){

      let discipline = this.allDisci.find(discipline => discipline.name === disciName)
      this.myDisciplineUpdate.push(discipline!)

    } 
    console.log(this.myDisciplineUpdate);
        

    let user: Partial<User> = {
      idDisciplines: this.myDisciplineUpdate
    }
    
    try {
      this._id = this.authService.getId()
      await this.userService.modifyUser(user, this._id!).toPromise();
     
    } catch (error) {
      console.log('error');

    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.myDisciplines.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.disciplineCtrl.setValue(null);
  }

  remove(discipline: string): void {
    const index = this.myDisciplines.indexOf(discipline);

    if (index >= 0) {
      this.myDisciplines.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.myDisciplines.push(event.option.viewValue);
    this.disciplineInput.nativeElement.value = '';
    this.disciplineCtrl.setValue(null);
  }

  private _filter(value: string): string[]{
    const filterValue = value.toLowerCase();
  
    return this.allDisciplinesName.filter(discipline => discipline.toLowerCase().includes(filterValue));
  }

}
