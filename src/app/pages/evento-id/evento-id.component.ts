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
  artista:string = '';
  reservaExistente = false;
  artistaEncontrado = false;
  contenidoCarro:any[] = [];

  constructor( private _servicioService:ServicesService,
               private route: ActivatedRoute){}

  ngOnInit(): void {
    this.index = this.route.snapshot.params['id']; //Capturamos el id del evento

    this._servicioService.getEventInfo().subscribe(eventosInfo => {
      this.eventosInfo = eventosInfo;
      this.searchIdEvent();
    });

    this.getSesionInfo();
    this.cargarContenidoCarro();


  }


  // FUNCIONES
  
  searchIdEvent():void{
    for (let i=0 ; i < this.eventosInfo.length ; i++){
      if ( parseInt(this.eventosInfo[i].event.id) == this.index ){ //Convertimos el string a num para la comparacion
        this.encontrado = true;
        this.artista = this.eventosInfo[i].event.title;
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

    this.reservaExistente = false;
    this.artistaEncontrado = false;

    if (opcion == 1) {
      //Restamos
      if( this.sesionesByEvent[sesionPos].availability >= 0 && this.sesionesByEvent[sesionPos].contadorEntradas != 0){
        this.sesionesByEvent[sesionPos].contadorEntradas--;
        this.sesionesByEvent[sesionPos].availability++  ;

        if (localStorage.getItem('reserva')) {
          let reserva = JSON.parse(localStorage.getItem('reserva') || '{}'); //Si es null nos devuelve un objeto vacio

          reserva = this.bookingSearching(reserva, sesionPos, opcion);

          if(this.setArtist(sesionPos)) {
            reserva.sesionReserva.push(this.setArtist(sesionPos));
          }

          this.updateBooking(reserva);
        }
      }

    }else if(opcion == 2){
      //Sumamos
      if( this.sesionesByEvent[sesionPos].availability > 0 ){

        this.sesionesByEvent[sesionPos].contadorEntradas++;
        this.sesionesByEvent[sesionPos].availability--  ;

        
        if (localStorage.getItem('reserva')) {
          let reserva = JSON.parse(localStorage.getItem('reserva') || '{}'); //Si es null nos devuelve un objeto vacio

          reserva = this.bookingSearching(reserva, sesionPos, opcion);

          if(this.setArtist(sesionPos)) {
            reserva.sesionReserva.push(this.setArtist(sesionPos));
          }

          this.updateBooking(reserva);
        } else{
           //Si no existe la variable porque no hay reservas hechas.. la creamos
          let sesionReserva = {
                                artista : this.artista,
                                sesion: [{fecha: this.sesionesByEvent[sesionPos].date,
                                          entradas : this.sesionesByEvent[sesionPos].contadorEntradas
                                        }]
          };

          let reservaNueva = {
            sesionReserva: [ sesionReserva ]
          };
          localStorage.setItem('reserva', JSON.stringify(reservaNueva));
        }
      }
    }//Fin_else_if  
    this.cargarContenidoCarro();
  }//Fin_fun_operacionSesion

  cargarContenidoCarro(){
    let reserva = JSON.parse(localStorage.getItem('reserva') || '{}');

    this.contenidoCarro = reserva.sesionReserva;
    console.log(this.contenidoCarro);
    
  }

  deleteSession(artistaI:number,sesionI:number){
    let reserva = JSON.parse(localStorage.getItem('reserva') || '{}');
    
    if (reserva.sesionReserva && reserva.sesionReserva[artistaI] && reserva.sesionReserva[artistaI].sesion) {
      reserva.sesionReserva[artistaI].sesion.splice(sesionI, 1);
      if (reserva.sesionReserva[artistaI].sesion.length == 0){
        reserva.sesionReserva.splice(artistaI, 1);
      }
      localStorage.setItem('reserva', JSON.stringify(reserva));
      this.cargarContenidoCarro(); //Actualizamos el carro de forma visual
    } else {
        console.log('No se encontró el elemento para eliminar');
    }
  }

  //FUNCIONES PRIVADAS
  private setArtist(sesionPos:number): any {
    if( !this.artistaEncontrado ){
      //Si no ha encontrado el artista, añadimos la nueva estructura
      let artistaReserva = {
        artista: this.artista,
        sesion: [{
            fecha: this.sesionesByEvent[sesionPos].date,
            entradas: this.sesionesByEvent[sesionPos].contadorEntradas
        }]
      };
      return artistaReserva;
    }
  }

  private updateBooking(reserva: any): void {
    localStorage.setItem('reserva', JSON.stringify(reserva));
  }

  private bookingSearching(reserva: any, sesionPos: number, option: number): any {
    // Buscamos si ya existe una reserva para la misma fecha
    for (let i = 0; i < reserva.sesionReserva.length; i++) {
      if( reserva.sesionReserva[i].artista == this.artista ){
        this.artistaEncontrado = true;
        for (let j = 0; j < reserva.sesionReserva[i].sesion.length; j++) {
          if ( reserva.sesionReserva[i].sesion[j].fecha == this.sesionesByEvent[sesionPos].date ){
            this.bookingNumberUpdate(reserva, i, j, option);
          }
        }
        if (!this.reservaExistente){
          reserva.sesionReserva[i].sesion.push({
            fecha: this.sesionesByEvent[sesionPos].date,
            entradas: this.sesionesByEvent[sesionPos].contadorEntradas
          });
          break;
        }
      }
    }//Fin_for

    return reserva;
  }

  private bookingNumberUpdate(reserva: any, bookingPosition: number, sessionPosition: number, option: number): void {
    this.reservaExistente = true;
    if(option === 1) {
      reserva.sesionReserva[bookingPosition].sesion[sessionPosition].entradas--;
    } else if(option === 2) {
      reserva.sesionReserva[bookingPosition].sesion[sessionPosition].entradas++;
    }
  }

  private getSesionInfo():void {
    let reserva = JSON.parse(localStorage.getItem('reserva') || '{}');

    //this.sesionesByEvent[sesionPos]
    //let reservaFilter = reserva.filter( f => )

  }

}