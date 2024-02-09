import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarReserveComponent } from './calendar-reserve/calendar-reserve.component';
import { ListPreviousReservationsComponent } from './list-previous-reservations/list-previous-reservations.component';

const routes: Routes = [
  { path: '', component: CalendarReserveComponent, title: 'calendar' },
  {
    path: 'reservas-anteriores',
    component: ListPreviousReservationsComponent,
    title: 'reserva',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
