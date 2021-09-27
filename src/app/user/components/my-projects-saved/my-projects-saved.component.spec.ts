import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProjectsSavedComponent } from './my-projects-saved.component';

describe('MyProjectsSavedComponent', () => {
  let component: MyProjectsSavedComponent;
  let fixture: ComponentFixture<MyProjectsSavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProjectsSavedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProjectsSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
