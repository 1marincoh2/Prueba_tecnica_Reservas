import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url: string = 'https://jsonserve.vercel.app/';
  constructor(private http: HttpClient) {}
  postReserve(body: any) {
    return this.http.post(`${this.url}reservas`, body);
  }
  getReserve() {
    return this.http.get(`${this.url}reservas`);
  }

}
