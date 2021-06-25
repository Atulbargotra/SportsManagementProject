import { Component, OnInit } from '@angular/core';

//toastr message
import { ToastrService } from 'ngx-toastr';
import { AddEvents } from 'src/app/Model/addEvents';

//service
import { EventService } from 'src/app/services/event.service';

//trash icon
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


//date formating
import * as Moment from 'moment';

@Component({
  selector: 'app-published',
  templateUrl: './published.component.html',
  styleUrls: ['./published.component.css'],
})
export class PublishedComponent implements OnInit {
  
  constructor(
    private eventService: EventService,
    private toast: ToastrService
  ) {}

  eventAvailable:boolean = false;
  eventList: AddEvents[];  //eventList array holding Published Events
  faTrashAlt = faTrashAlt;

  ngOnInit(): void {
    this.handlePublishedEventRetrival('Published');
  }

 
  handlePublishedEventRetrival(status: string) {
    this.eventService.getAllEventsDetails(status).subscribe((getResponse) => {
      const resPublished = JSON.parse(JSON.stringify(getResponse));
      if (resPublished.status == 200) {
        // 2021-06-27
        let today = Moment().format('YYYY-MM-DD')
        
        // this.eventList = resPublished.allEvents;
        this.eventList = (resPublished.allEvents).filter((event:AddEvents)=> event.endDate >= today);
        
        if(this.eventList.length){
          this.eventAvailable = true;
        }else
        {
          this.eventAvailable = false;
        }
      } else {
        this.toast.error('Error occured while adding event');
      }
    });
  }

  handleEventDelete(id:number){
      
    this.eventService.deleteEvent(id).subscribe(deleteResponse =>{
      const resDel = JSON.parse(JSON.stringify(deleteResponse));
      if (resDel.status == 200) {
        this.toast.success("Deleted successfully");
        this.handlePublishedEventRetrival('Published');
      } else {
        this.toast.error('Error occured while deleting event');
      }
    })
  }
  
}
