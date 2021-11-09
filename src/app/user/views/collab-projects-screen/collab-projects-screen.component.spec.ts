import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabProjectsScreenComponent } from './collab-projects-screen.component';

describe('CollabProjectsScreenComponent', () => {
  let component: CollabProjectsScreenComponent;
  let fixture: ComponentFixture<CollabProjectsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollabProjectsScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabProjectsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
