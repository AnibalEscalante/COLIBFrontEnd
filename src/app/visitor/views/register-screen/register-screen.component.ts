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
import { UserRegister } from 'src/app/core/models/userRegister';
import { Auth } from 'src/app/core/models/auth.model';

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



  constructor(
    private _formBuilder: FormBuilder,
    private formBuilder: FormBuilder,
    private router: Router, 
    private AuthService : AuthService
    
    ) {
      this.registerForm = this.formBuilder.group({
          
        name: ['', [Validators.required, Validators.pattern('[a-zA-Z]{2,32}')]],
        lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]{2,32}')]],         
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
        )]],
        movilPhone: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{9}$")]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        
    }, {
        validator: this.MustMatch('password', 'confirmPassword')
        
    });
    
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

  emailReq = new FormControl('', [Validators.required, Validators.email]);

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////// Step 1///////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  registerForm: FormGroup;
  submitted = false;
  mensaje: string = "";
  isDivVisible = false;


  get name() { return this.registerForm?.get('name'); }
  get lastName() { return this.registerForm?.get('lastName'); }
  get email() { return this.registerForm?.get('email'); }
  get movilPhone() { return this.registerForm?.get('movilPhone'); }
  get password() { return this.registerForm?.get('password'); }

  
  async onSubmit() {
    let usuario: Partial<User & Auth> = {
        name: this.registerForm.get('name')!.value,
        lastName: this.registerForm.get('lastName')!.value,
        email: this.registerForm.get('email')!.value,
        movilPhone: this.registerForm.get('movilPhone')!.value,
        password: this.registerForm.get('password')!.value,
    }
    try {
        await this.AuthService.
            register(usuario.name!, 
                    usuario.lastName!,
                    usuario.email!,
                    usuario.movilPhone!,
                    usuario.password!)
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
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////// Step 4///////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
}
