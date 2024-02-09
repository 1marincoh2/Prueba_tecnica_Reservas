import { Component, Inject, OnInit } from '@angular/core';
import { SharedService } from '../service/shared.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '../services/http.service';
@Component({
  selector: 'app-modal-reserve',
  templateUrl: './modal-reserve.component.html',
  styleUrls: ['./modal-reserve.component.scss'],
})
export class ModalReserveComponent implements OnInit {

  horas: string[] = [
    '7 am',
    '8 am',
    '9 am',
    '10 am',
    '11 am',
    '12 pm',
    '1 pm',
    '2 pm',
    '3 pm',
    '4 pm',
    '5 pm',
    '6 pm',
  ];
  date!: string;
  hora!: string;
  reservas!: any[];
  reserveForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    fecha_entrega: new FormControl('', [Validators.required]),
    hora: new FormControl('', [Validators.required]),
  });
  btnAction: string = 'Reservar';
  constructor(
    private dialogReferencia: MatDialogRef<ModalReserveComponent>,
    private _reserveSevice: HttpService,
    @Inject(MAT_DIALOG_DATA) public itemDate: any,
    private sharedService: SharedService
  ) {}

  
  getReser() {
    this._reserveSevice.getReserve().subscribe((data: any) => {
      this.reservas = data;
    });
  }

  saveReserve() {
    const payloadReserve = {
      cliente: {
        nombre: this.reserveForm.value.nombre,
        telefono: this.reserveForm.value.telefono,
        email: this.reserveForm.value.email,
      },
      pedido: {
        fecha_entrega: this.reserveForm.value.fecha_entrega,
        hora_entrega: this.reserveForm.value.hora,
      },
    };
    this._reserveSevice.postReserve(payloadReserve).subscribe({
      next: (data: any) => {
        this.getReser();
        this.dialogReferencia.close();
        this.sharedService.reservaActualizada.emit();
      },
      error: (e: any) => {
        console.log(e, 'error');
      },
    });
  }

  isHoraSelected(hour: string): boolean {
    const reservasEnFecha = this.reservas.filter(
      (reserva) => reserva.pedido.fecha_entrega === this.date
    );
    return reservasEnFecha.some(
      (reserva) => reserva.pedido.hora_entrega === hour
    );
  }
  ngOnInit(): void {
    this.date = this.itemDate;
    this.getReser();
  }
}
