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


  // FUNCIONES
  
  searchIdEvent():void{
    for (let i=0 ; i < this.eventosInfo.length ; i++){
      if ( parseInt(this.eventosInfo[i].event.id) == this.index ){ //Convertimos el string a num para la comparacion
        this.encontrado = true;
        for (let j=0 ; j < this.eventosInfo[i].sessions.length; j++){
          this.sesionesByEvent.push(this.eventosInfo[i].sessions[j]);
          this.eventosInfo[i].sessions[j].contadorEntradas = 0;
        }
      }
      
    } 
    this.sesionesByEvent = this.sesionesByEvent.sort((a, b) => a.date - b.date);
  }

  //Acciones con el carrito

  operacionSesion(sesionPos:number,opcion:number){
    //opcion 1 = restar
    //opcion 2 = sumar

    if (opcion == 1) {
      //Restamos
      if( this.sesionesByEvent[sesionPos].availability >= 0 && this.sesionesByEvent[sesionPos].contadorEntradas != 0){
        this.sesionesByEvent[sesionPos].contadorEntradas--;
        this.sesionesByEvent[sesionPos].availability++  ;
      }

    }else if(opcion == 2){
      //Sumamos
      if( this.sesionesByEvent[sesionPos].availability > 0 ){
        this.sesionesByEvent[sesionPos].contadorEntradas++;
        this.sesionesByEvent[sesionPos].availability--  ;
      }
    }
    
    
  }


  

}
