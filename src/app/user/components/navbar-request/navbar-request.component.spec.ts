import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarRequestComponent } from './navbar-request.component';

describe('NavbarRequestComponent', () => {
  let component: NavbarRequestComponent;
  let fixture: ComponentFixture<NavbarRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
