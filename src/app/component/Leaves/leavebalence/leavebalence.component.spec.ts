import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavebalenceComponent } from './leavebalence.component';

describe('LeavebalenceComponent', () => {
  let component: LeavebalenceComponent;
  let fixture: ComponentFixture<LeavebalenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavebalenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavebalenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
