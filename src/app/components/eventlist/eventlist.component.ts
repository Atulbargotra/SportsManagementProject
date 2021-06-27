import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../../services/event.service';
import { AddEvents } from 'src/app/Model/addEvents';



@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css'],
})
export class EventlistComponent implements OnInit {

  @Input() event:AddEvents;

  constructor(
    private route: Router,
    private toast: ToastrService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
  }





}
