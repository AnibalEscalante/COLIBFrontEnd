import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageScreenComponent } from './home-page-screen.component';

describe('HomePageScreenComponent', () => {
  let component: HomePageScreenComponent;
  let fixture: ComponentFixture<HomePageScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
