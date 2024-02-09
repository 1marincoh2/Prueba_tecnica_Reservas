import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { Location } from '@angular/common';

export interface PeriodicElement {
  nombre: string;
  telefono: string;
  email: string;
  fecha_entrega: string;
  hora_entrega: string;
}

@Component({
  selector: 'app-list-previous-reservations',
  templateUrl: './list-previous-reservations.component.html',
  styleUrls: ['./list-previous-reservations.component.scss'],
})
export class ListPreviousReservationsComponent implements OnInit {
  data!: PeriodicElement[];
  displayedColumns: string[] = [
    'nombre',
    'telefono',
    'email',
    'fecha_entrega',
    'hora_entrega',
  ];

  loading: boolean = false;
  constructor(
    private router: Router,
    private location: Location,
    private _reserveSevice: HttpService,  ) {}

 
  goBack(): void {
    this.location.back();
  }
  getReser() {
    this._reserveSevice.getReserve().subscribe((data: any) => {
      this.loading = false;
      const nuevoFormato = data.map((item: any) => ({
        nombre: item.cliente.nombre,
        telefono: item.cliente.telefono,
        email: item.cliente.email,
        fecha_entrega: item.pedido.fecha_entrega,
        hora_entrega: item.pedido.hora_entrega,
      }));
      this.data = nuevoFormato;
      console.log(data, 'data del servidor');
      this.loading = true;
    });
  }

  ngOnInit(): void {
    this.getReser();
  }
}
