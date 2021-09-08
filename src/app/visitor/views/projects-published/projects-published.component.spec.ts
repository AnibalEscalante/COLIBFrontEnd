import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsPublishedComponent } from './projects-published.component';

describe('ProjectsPublishedComponent', () => {
  let component: ProjectsPublishedComponent;
  let fixture: ComponentFixture<ProjectsPublishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsPublishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsPublishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
