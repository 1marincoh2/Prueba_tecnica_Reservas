import { Component, OnInit,OnDestroy } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Subscription } from 'rxjs';
import { SharedService } from '../service/shared.service';
@Component({
  selector: 'app-review-summary',
  templateUrl: './review-summary.component.html',
  styleUrls: ['./review-summary.component.scss']
})
export class ReviewSummaryComponent implements OnInit{
  private subscription: Subscription;
  constructor(
    private _reserveSevice: HttpService,private sharedService: SharedService  ) { this.subscription = this.sharedService.reservaActualizada.subscribe(() => {
      this.getReser();
    });}
  deliveries :any;
   loading: boolean = false;


    getReser() {
      this._reserveSevice.getReserve().subscribe((data: any) => {
        this.loading = false;
       // Obtener el último ID
const ultimoId = Math.max(...data.map((item:any) => item.id));

// Encontrar el objeto que coincide con el último ID
        this.deliveries=data.find((item:any) => item.id === ultimoId);
        this.loading = true;
      });
    }
  ngOnInit(): void {
    this.getReser()
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
