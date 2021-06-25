import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/services/event.service';
import { winnersDetails } from '../../Model/winnersDetails';

//Date Formating
import * as Moment from 'moment';

import { AddEvents } from '../../Model/addEvents';

@Component({
  selector: 'app-announce-winner',
  templateUrl: './announce-winner.component.html',
  styleUrls: ['./announce-winner.component.css'],
})
export class AnnounceWinnerComponent implements OnInit {
  w1: string;
  w2: string;
  w3: string;
  eventList: AddEvents[];
  eventAvailable: boolean = false;

  constructor(
    private eventService: EventService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.handleAnnouncedEventDetails()
  }

  handlePostWinnerDetails(eventId: number, f: NgForm) {
    const winnersDetails: winnersDetails = {
      w1: this.w1,
      w2: this.w2,
      w3: this.w3,
    };
    this.eventService.postWinnnerDetails(eventId, winnersDetails).subscribe(
      (postResponse) => {
        const winRes = JSON.parse(JSON.stringify(postResponse));
        if (winRes.status === 200) {
          this.toast.info('Winner Announced');
          f.reset();
        }
      },
      (error) => {
        this.toast.error('Error occured while anouncing winners');
        f.reset();
      }
    );
  }

  clearDataOnDiscard(f: NgForm) {
    f.reset();
  }

  handleAnnouncedEventDetails() {
    this.eventService.getAllEventsDetails('Published').subscribe(
      (getResponse) => {
        const resClosed = JSON.parse(JSON.stringify(getResponse));
       
        if (resClosed.status == 200) {
         // console.log(resClosed.allEvents)
         // 2021-06-27
         let today = Moment().format('YYYY-MM-DD')

         //get all events that are expired
          this.eventList = (resClosed.allEvents).filter((event:AddEvents)=> event.endDate < today)
          
          if (this.eventList.length) {
            this.eventAvailable = true;
          } else {
            this.eventAvailable = false;
          }
        } else {
          this.toast.error('Error occured while retriving events');
        }
      },
    );
  }
  

}
