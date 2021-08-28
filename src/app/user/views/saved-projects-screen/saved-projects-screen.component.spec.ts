import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedProjectsScreenComponent } from './saved-projects-screen.component';

describe('SavedProjectsScreenComponent', () => {
  let component: SavedProjectsScreenComponent;
  let fixture: ComponentFixture<SavedProjectsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedProjectsScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedProjectsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
