import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimerangeComponent } from './datetimerange.component';

describe('DatetimerangeComponent', () => {
  let component: DatetimerangeComponent;
  let fixture: ComponentFixture<DatetimerangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatetimerangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatetimerangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
