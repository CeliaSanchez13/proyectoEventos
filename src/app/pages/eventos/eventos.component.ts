import { Component } from '@angular/core';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent {
  
  events!: any[];

  constructor(private _servicesService: ServicesService) {}

  ngOnInit(): void {
    this._servicesService.getEvents().subscribe(data => {
      this.events = data.sort((a, b) => a.endDate - b.endDate);
    });
  }
}
