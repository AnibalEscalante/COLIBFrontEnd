import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProjectsScreenComponent } from './my-projects-screen.component';

describe('MyProjectsScreenComponent', () => {
  let component: MyProjectsScreenComponent;
  let fixture: ComponentFixture<MyProjectsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProjectsScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProjectsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
