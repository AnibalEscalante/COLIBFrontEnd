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
import { MatChipsModule, MAT_CHIPS_DEFAULT_OPTIONS} from '@angular/material/chips';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatCardModule} from '@angular/material/card';
import { MatDialogModule} from '@angular/material/dialog';
import { EditDisciComponent } from './components/dialogs/edit-disci/edit-disci.component';
import { EditSkillsComponent } from './components/dialogs/edit-skills/edit-skills.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EditContactsComponent } from './components/dialogs/edit-contacts/edit-contacts.component';
import { EditProjectComponent } from './components/dialogs/edit-project/edit-project.component';
import { EditPersonalInfoComponent } from './components/dialogs/edit-personal-info/edit-personal-info.component';
import { EditPasswordComponent } from './components/dialogs/edit-password/edit-password.component';
import { CreateProjectComponent } from './components/dialogs/create-project/create-project.component';
import { ProjectInfoComponent } from './components/project-info/project-info.component';
import { RequestsComponent } from './components/requests/requests.component';
import { ContactComponent } from './components/contact/contact.component';
import { MessageComponent } from './components/message/message.component';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';
import { MyProjectsSavedComponent } from './components/my-projects-saved/my-projects-saved.component';
import { MenuComponent } from './components/menu/menu.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { COMMA, ENTER } from '@angular/cdk/keycodes';


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
    EditDisciComponent,
    EditSkillsComponent,
    EditContactsComponent,
    EditProjectComponent,
    EditPersonalInfoComponent,
    EditPasswordComponent,
    CreateProjectComponent,
    RequestsComponent,
    ProjectInfoComponent,
    ContactComponent,
    MessageComponent,
    MyProjectsComponent,
    MyProjectsSavedComponent,
    MenuComponent
  ],
  providers: [
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA]
      }
    }
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
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatMenuModule,
    Ng2SearchPipeModule
  ]
})
export class UserModule { }
