import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsScreenComponent } from './contacts-screen.component';

describe('ContactsScreenComponent', () => {
  let component: ContactsScreenComponent;
  let fixture: ComponentFixture<ContactsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
