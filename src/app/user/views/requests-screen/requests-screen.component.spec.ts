import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsScreenComponent } from './requests-screen.component';

describe('RequestsScreenComponent', () => {
  let component: RequestsScreenComponent;
  let fixture: ComponentFixture<RequestsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestsScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
