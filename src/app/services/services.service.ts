import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, zip,} from 'rxjs';
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
  getEventInfo(): Observable<Evento[]> {
    //Separamos en variables lo que serian las distintas solicitudes en este caso ya que hemos tenido anteriormente problemas de
    //asincronia, utilizamos un zip y un map para retornar lo que seria el array compuesto con el resultado de las dos solicitudes en este caso
    const request1 = this.http.get<Evento>('assets/data/event-info-68.json')

    const request2 = this.http.get<Evento>('assets/data/event-info-184.json')
   
    return zip(request1, request2).pipe(
      map(([response1, response2]) => {
        return [response1, response2];
      })
    );
    // zip combinara las respuestas de ambas solicitudes HTTP y 
    //emitira un array con los datos de ambas una vez que ambos observables se completen.
  }

}
