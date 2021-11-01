import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyEmpReportComponent } from './monthly-emp-report.component';

describe('MonthlyEmpReportComponent', () => {
  let component: MonthlyEmpReportComponent;
  let fixture: ComponentFixture<MonthlyEmpReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyEmpReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyEmpReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
