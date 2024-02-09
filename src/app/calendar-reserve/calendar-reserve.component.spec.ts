import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarReserveComponent } from './calendar-reserve.component';

describe('CalendarReserveComponent', () => {
  let component: CalendarReserveComponent;
  let fixture: ComponentFixture<CalendarReserveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarReserveComponent]
    });
    fixture = TestBed.createComponent(CalendarReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
