import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../../services/event.service';
import { AddEvents } from 'src/app/Model/addEvents';

//date formating
import * as Moment from 'moment';



@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css'],
})
export class EventlistComponent implements OnInit {
  constructor(
    private route: Router,
    private toast: ToastrService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.getEventList();
  }

  eventAvailable: boolean = false;
  eventList: AddEvents[];

  //Get all Published Events here
  getEventList() {
    this.eventService
      .getAllEventsDetails('Published')
      .subscribe((getResponse) => {
        const resPublished = JSON.parse(JSON.stringify(getResponse));
        if (resPublished.status == 200) {
          // 2021-06-27
          let today = Moment().format('YYYY-MM-DD');

          // this.eventList = resPublished.allEvents;
          this.eventList = resPublished.allEvents.filter(
            (event: AddEvents) => event.endDate >= today
          );

          if (this.eventList.length) {
            this.eventAvailable = true;
          } else {
            this.eventAvailable = false;
          }
        } else {
          this.toast.error('Error occured while adding event');
        }
      });
  }
  

}
