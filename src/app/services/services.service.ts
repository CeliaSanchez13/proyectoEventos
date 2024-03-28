import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../interface/evento.interface';
import { Eventos } from '../interface/eventos.interface';
import { Session } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  byEvent: Evento[] = [];
  byEventAux: any[] = [];
  id:number = 0;

  constructor(private http: HttpClient) { }

  //Pagina principal
  getEvents(): Observable<any[]> {
    return this.http.get<Eventos[]>('assets/data/events.json'); // Traemos la estructura JSON
  }

  //Pagina evento JMS-68 PA-184
  getEventInfo() {
    //this.byEvent = [];
    //Capturamos en este caso las dos infos de los eventos que tenemos actualmente disponibles. Nos devolverá un array el cual return
    this.http.get<Evento>('assets/data/event-info-68.json').subscribe(data => {
      this.byEvent.push(data);
    })

    this.http.get<Evento>('assets/data/event-info-184.json').subscribe(data1 => {
      this.byEvent.push(data1)
    })
    console.log("Listado eventosBy"+ this.byEvent);
    //this.id = index;
    //this.searchIdEvent()

    return this.byEvent
  }
/*
  searchIdEvent():void{
    for (let i=0 ; i < this.byEvent.length ; i++){
      if ( parseInt(this.byEvent[i].event.id) == this.id ){ 
        for (let j=0 ; j < this.byEvent[i].sessions.length; j++){
          console.log(this.byEvent[i].sessions[j])
          this.byEventAux.push(this.byEvent[i].sessions[j]);
        }
      }
    } 
  console.log(this.byEventAux);
}*/
  
}
