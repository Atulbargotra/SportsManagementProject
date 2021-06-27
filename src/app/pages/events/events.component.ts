import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddEvents } from 'src/app/Model/addEvents';
import {EventService} from '../../services/event.service'

//date formating
import * as Moment from 'moment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(
    private toast:ToastrService,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.getEventList()
  }

  eventAvailable: boolean = false;
  eventList: AddEvents[];
  filterValue:string;


  getFilterValue(value:string){
    this.filterValue = value;
    console.log("In Parent component : "+this.filterValue)
  }

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
