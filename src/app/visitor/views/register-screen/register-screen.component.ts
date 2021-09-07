import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';

export class CdkCustomStepperWithoutFormExample {}
@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.less']
})
export class RegisterScreenComponent implements OnInit {
  hide = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;



  constructor(private _formBuilder: FormBuilder) {
    //fruits//
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filterFruits(fruit) : this.allFruits.slice()));

    //vegetables//
    this.filteredVegetables = this.vegetableCtrl.valueChanges.pipe(
      startWith(null),
      map((vegetable: string | null) => vegetable ? this._filterVegetables(vegetable) : this.allVegetables.slice()));
  }

  // Dialogs //
  ngOnInit() {
    //dialogs//
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ''
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ''
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ''
    });

    //form group
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterFruits(value))
    );

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterVegetables(value))
    );

  }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  //chip form group//
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  //fruits//
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry', 'Anana', 'banana'];

  //vegetables//
  vegetableCtrl = new FormControl();
  filteredVegetables: Observable<string[]>;
  vegetables: string[] = ['Melons'];
  allVegetables: string[] =['Melons' , 'peas', 'cabbages', 'broccoli', 'watercress', 'beetroot'];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  @ViewChild('fruitInput') vegetableInput!: ElementRef<HTMLInputElement>;

  //fruit functions//
  addFruit(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  removeFruit(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selectedFruit(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filterFruits(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  //vegetable function//

  addVegetable(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.vegetables.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.vegetableCtrl.setValue(null);
  }

  removeVegetable(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selectedVegetable(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }
  
  private _filterVegetables(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

}
