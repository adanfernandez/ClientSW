import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmationComponentComponent } from './dialog-confirmation-component.component';

describe('DialogConfirmationComponentComponent', () => {
  let component: DialogConfirmationComponentComponent;
  let fixture: ComponentFixture<DialogConfirmationComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmationComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
