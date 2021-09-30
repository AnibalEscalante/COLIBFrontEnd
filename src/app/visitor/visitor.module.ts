import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitorRoutingModule } from './visitor-routing.module';
import { LoginScreenComponent } from './views/login-screen/login-screen.component';
import { RegisterScreenComponent } from './views/register-screen/register-screen.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeScreenComponent } from './views/home-screen/home-screen.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectsPublishedComponent } from './views/projects-published/projects-published.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectInfoComponent } from './components/project-info/project-info.component';
import { ProjectInfoScreenComponent } from './views/project-info-screen/project-info-screen.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LoginScreenComponent,
    RegisterScreenComponent,
    HomeScreenComponent,
    ProjectsPublishedComponent,
    ProjectComponent,
    ProjectInfoComponent,
    ProjectInfoScreenComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    VisitorRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CdkStepperModule,
    CommonModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatDialogModule
  ]
})
export class VisitorModule { }
