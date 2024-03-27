import { Component } from '@angular/core';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent {
  
  events!: any[];

  constructor(private _eventService: ServicesService) {}

  ngOnInit(): void {
    this._eventService.getEvents().subscribe(data => {
      this.events = data.sort((a, b) => a.endDate - b.endDate);
      console.log(this.events)
    });
  }
}
