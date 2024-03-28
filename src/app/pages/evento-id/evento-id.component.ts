import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { ActivatedRoute } from '@angular/router';
import { Evento } from '../../interface/evento.interface';


@Component({
  selector: 'app-evento-id',
  templateUrl: './evento-id.component.html',
  styleUrl: './evento-id.component.css'
})
export class EventoIdComponent implements OnInit{

  index:number = 0;
  eventosInfo:Evento[] = [];
  sesionesByEvent:any[] = [];
  encontrado = false;

  constructor( private _servicioService:ServicesService,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.index = this.route.snapshot.params['id']; //Capturamos el id del evento

    this._servicioService.getEventInfo().subscribe(eventosInfo => {
      this.eventosInfo = eventosInfo;
      this.searchIdEvent();
    });
    
  }


  //Funciones
  
  searchIdEvent():void{
    for (let i=0 ; i < this.eventosInfo.length ; i++){
      if ( parseInt(this.eventosInfo[i].event.id) == this.index ){ //Convertimos el string a num para la comparacion
        this.encontrado = true;
        for (let j=0 ; j < this.eventosInfo[i].sessions.length; j++){
          this.sesionesByEvent.push(this.eventosInfo[i].sessions[j]);
        }
      }
    } 
}
  

}
