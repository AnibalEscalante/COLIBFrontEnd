import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileProjectInfoComponent } from './profile-project-info.component';

describe('ProfileProjectInfoComponent', () => {
  let component: ProfileProjectInfoComponent;
  let fixture: ComponentFixture<ProfileProjectInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileProjectInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileProjectInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
