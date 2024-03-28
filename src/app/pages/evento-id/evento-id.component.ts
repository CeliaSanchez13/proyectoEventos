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

  constructor( private _servicioService:ServicesService,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.index = this.route.snapshot.params['id']; //Capturamos el id del evento
    this.eventosInfo = this._servicioService.getEventInfo();
  }
  
}
