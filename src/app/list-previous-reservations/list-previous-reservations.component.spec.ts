import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPreviousReservationsComponent } from './list-previous-reservations.component';

describe('ListPreviousReservationsComponent', () => {
  let component: ListPreviousReservationsComponent;
  let fixture: ComponentFixture<ListPreviousReservationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPreviousReservationsComponent]
    });
    fixture = TestBed.createComponent(ListPreviousReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
