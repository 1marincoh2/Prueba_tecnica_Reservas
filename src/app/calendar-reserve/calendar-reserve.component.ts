import { Component, OnInit } from '@angular/core';
import { ModalReserveComponent } from '../modal-reserve/modal-reserve.component';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
  MatDialogConfig,
} from '@angular/material/dialog';
@Component({
  selector: 'app-calendar-reserve',
  templateUrl: './calendar-reserve.component.html',
  styleUrls: ['./calendar-reserve.component.scss']
})
export class CalendarReserveComponent implements OnInit {

  constructor(private dialog: MatDialog,private router: Router, ) { }

  weeks: { number: number | null, available: boolean }[][] = [];
  currentMonth: number = 8; // Septiembre: 8 (mes: 8 porque los meses se indexan desde 0)
  currentMonthName: string = '';
  daysHeaders: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  selectedDate!: Date;



  generateCalendar(month: number): void {
    this.weeks = [];
    const startDate = new Date(2023, month, 1);
    const endDate = new Date(2023, month + 1, 0);
    const startDayOfWeek = startDate.getDay(); // Día de la semana en el que comienza el mes
    const daysInMonth = endDate.getDate(); // Número de días en el mes

    let currentWeek: { number: number | null, available: boolean }[] = [];

    // Calcular el índice del primer día de la semana en el array daysHeaders
    const startDayIndex = (startDayOfWeek + 6) % 7;

    // Llenar con días vacíos hasta llegar al primer día de la semana
    for (let i = 0; i < startDayIndex; i++) {
      currentWeek.push({ number: null, available: false });
    }

    let dayCounter = 1; // Contador para los días del mes

    // Llenar los días del mes
    while (dayCounter <= daysInMonth) {
      currentWeek.push({
        number: dayCounter,
            available: this.isDayAvailable(dayCounter) 
      });

      if (currentWeek.length === 7) {
        this.weeks.push([...currentWeek]);
        currentWeek = [];
      }

      dayCounter++;
    }

    // Llenar con días vacíos al final del último día del mes
    while (currentWeek.length < 7) {
      currentWeek.push({ number: null, available: false });
    }

    // Añadir la última semana al calendario 
    if (currentWeek.length > 0) {
      this.weeks.push([...currentWeek]);
    }
  }

  isDayAvailable(day: number): boolean {
    // Definir los días fijos activos 
    const availableDays = [1, 3, 5, 7, 9,10,13,15,16,18,19,21,22,23,24,26,27,28,30]; 
    return availableDays.includes(day);
  }
  updateMonthName(month: number): void {
    const date = new Date(2023, month, 1);
    const options = { month: 'long' };
    this.currentMonthName = date.toLocaleDateString('es-ES', { month: 'long' });
  }



  openModalForDay(day: any) {
    const dialogConfig = new MatDialogConfig();

   
    if (day.available) {
      
      this.selectedDate = new Date(2023, 8, day.number);
      console.log(new Date(2023, 8, day),"j ")
      dialogConfig.width = '50%';
      dialogConfig.disableClose = true;
      dialogConfig.data= this.selectedDate.toISOString().slice(0, 10);;
      this.dialog.open(ModalReserveComponent, dialogConfig)
      
    }
  }

  goBack() {
    this.router.navigate(['/reservas-anteriores']);
  }
  ngOnInit(): void {
    this.generateCalendar(this.currentMonth);
    this.updateMonthName(this.currentMonth);
   
  }
}
