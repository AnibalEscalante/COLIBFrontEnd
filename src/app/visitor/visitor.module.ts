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

@NgModule({
  declarations: [
    NavbarComponent,
    LoginScreenComponent,
    RegisterScreenComponent,
    HomeScreenComponent
  ],
  imports: [
    CommonModule,
    VisitorRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CdkStepperModule
  ]
})
export class VisitorModule { }
