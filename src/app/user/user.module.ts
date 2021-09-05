import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeScreenComponent } from './views/home-screen/home-screen.component';
import { ProjectComponent } from './components/project/project.component';
import { ContactsScreenComponent } from './views/contacts-screen/contacts-screen.component';
import { UserInfoScreenComponent } from './views/user-info-screen/user-info-screen.component';
import { SavedProjectsScreenComponent } from './views/saved-projects-screen/saved-projects-screen.component';
import { MyProjectsScreenComponent } from './views/my-projects-screen/my-projects-screen.component';
import { RequestsScreenComponent } from './views/requests-screen/requests-screen.component';
import { ProjectInfoScreenComponent } from './views/project-info-screen/project-info-screen.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { EditDisciComponent } from './components/dialogs/edit-disci/edit-disci.component';
import { EditSkillsComponent } from './components/dialogs/edit-skills/edit-skills.component';



@NgModule({
  declarations: [
    NavbarComponent,
    HomeScreenComponent,
    ProjectComponent,
    ContactsScreenComponent,
    UserInfoScreenComponent,
    SavedProjectsScreenComponent,
    MyProjectsScreenComponent,
    RequestsScreenComponent,
    ProjectInfoScreenComponent,
    DialogComponent,
    EditDisciComponent,
    EditSkillsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule
  ]
})
export class UserModule { }
