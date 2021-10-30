import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import { DisciplineService } from 'src/app/core/services/discipline/discipline.service';
import { Discipline } from 'src/app/core/models/discipline.model';


@Component({
  selector: 'app-edit-disci',
  templateUrl: './edit-disci.component.html',
  styleUrls: ['./edit-disci.component.less']
})
export class EditDisciComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredDisciplines: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Appleee', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  myDisciplines!: string[];
  allDisciplines!: any[];

  @ViewChild('disciplineInput') disciplineInput!: ElementRef<HTMLInputElement>;

  constructor(
    private disciplineService: DisciplineService
  ) {
    this.filteredDisciplines = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((discipline: string | null) => discipline ? this._filter(discipline) : this.allFruits.slice()));
  }

  async fetchDiscipline() {
    try {
      this.allDisciplines = await this.disciplineService.getallDiscipline().toPromise();
      console.log(this.allDisciplines)
    }
    catch (error) {
      console.log('Algo ha salido mal');
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

    this.fruitCtrl.setValue(null);
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
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): any[]{
    const filterValue = value.toLowerCase();
  
    return this.allDisciplines.filter(discipline => discipline.toLowerCase().includes(filterValue));
  }

}
