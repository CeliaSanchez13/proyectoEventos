import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../interface/evento.interface';
import { Eventos } from '../interface/eventos.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  byEvent: Evento[] = [];

  constructor(private http: HttpClient) { }

  //Pagina principal
  getEvents(): Observable<any[]> {
    return this.http.get<Eventos[]>('assets/data/events.json'); // Traemos la estructura JSON
  }

  //Pagina evento JMS-68 PA-184
  getEventInfo(): Evento[] {
    //Capturamos en este caso las dos infos de los eventos que tenemos actualmente disponibles. Nos devolverá un array el cual return
    this.http.get<Evento>('assets/data/event-info-68.json').subscribe(data => {
      this.byEvent.push(data);
    })

    this.http.get<Evento>('assets/data/event-info-184.json').subscribe(data1 => {
      this.byEvent.push(data1)
    })
    
    return this.byEvent
  }
  
}
