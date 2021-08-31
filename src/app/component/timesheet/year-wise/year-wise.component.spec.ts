import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearWiseComponent } from './year-wise.component';

describe('YearWiseComponent', () => {
  let component: YearWiseComponent;
  let fixture: ComponentFixture<YearWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearWiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
