import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarRequestResultComponent } from './navbar-request-result.component';

describe('NavbarRequestResultComponent', () => {
  let component: NavbarRequestResultComponent;
  let fixture: ComponentFixture<NavbarRequestResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarRequestResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarRequestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
