import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfoScreenComponent } from './project-info-screen.component';

describe('ProjectInfoScreenComponent', () => {
  let component: ProjectInfoScreenComponent;
  let fixture: ComponentFixture<ProjectInfoScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectInfoScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInfoScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
