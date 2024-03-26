import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  //Pagina principal
  getEvents(): Observable<any[]> {
    return this.http.get<any[]>('assets/data/events.json'); // Traemos la estructura JSON
  }

  //Pagina evento JMS-68
  getEventInfo68(): Observable<any[]> {
    return this.http.get<any[]>('assets/data/event-info-68.json'); // Traemos la estructura JSON
  }

  //Pagina evento PA-184
  getEventInfo184(): Observable<any[]> {
    return this.http.get<any[]>('assets/data/event-info-184.json'); // Traemos la estructura JSON
  }
  
}
