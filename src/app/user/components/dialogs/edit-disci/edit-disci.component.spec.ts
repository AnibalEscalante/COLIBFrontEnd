import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDisciComponent } from './edit-disci.component';

describe('EditDisciComponent', () => {
  let component: EditDisciComponent;
  let fixture: ComponentFixture<EditDisciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDisciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDisciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
