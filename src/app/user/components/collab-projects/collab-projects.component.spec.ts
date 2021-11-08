import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabProjectsComponent } from './collab-projects.component';

describe('CollabProjectsComponent', () => {
  let component: CollabProjectsComponent;
  let fixture: ComponentFixture<CollabProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollabProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
