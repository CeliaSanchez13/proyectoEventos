import { Component, OnInit } from '@angular/core';
import { ServicesService } from './services/services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  //Primera prueba para la recuperacion de los datos
  events!: any[];

  constructor(private _eventService: ServicesService) {}

  ngOnInit(): void {
    this._eventService.getEvents().subscribe(data => {
      this.events = data;
      console.log(this.events)
    });
  }
}
