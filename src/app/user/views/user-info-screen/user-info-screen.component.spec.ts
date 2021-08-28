import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoScreenComponent } from './user-info-screen.component';

describe('UserInfoScreenComponent', () => {
  let component: UserInfoScreenComponent;
  let fixture: ComponentFixture<UserInfoScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInfoScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
