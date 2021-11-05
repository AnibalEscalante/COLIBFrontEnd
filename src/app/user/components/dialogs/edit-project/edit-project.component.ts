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


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.less']
})
export class EditProjectComponent implements OnInit {
  
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  


  public _id!: string | null;
  public updateProject: FormGroup;
  public project!: Project
  public userEmail!: string;

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<EditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string},
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));

      this.updateProject = this.formBuilder.group({
      
        title: ['', [Validators.pattern('[a-zA-Z]{2,32}')]],
        content: ['',  [Validators.pattern('[a-zA-Z]{2,32}')]],       
        finishDate: ['',  [Validators.required]]
    }),
    this.fetchProject();
   }
  
   async fetchProject() {
    try {
      this._id = this.authService.getId()
      const response: any= await this.projectService.getProject(this.data.id).toPromise();
      this.project = response.message;
      console.log(this.data.id);
      
      console.log(this.project);
      
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
    let project: Partial<Project> = {
      title:  this.title ? this.title : this.project.title,
      content: this.content ? this.content: this.project.content,
      finishDate: this.finishDate ? this.finishDate: this.project.finishDate
    }

    try {
      /* this._id = this.authService.getId() */
      await this.projectService.modifyProject(project, this.data.id).toPromise();
     
    } catch (error) {
      console.log('error');

    }
  }
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

}
