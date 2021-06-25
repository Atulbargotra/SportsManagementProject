import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//svg icons
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

//toastr message
import { ToastrService } from 'ngx-toastr';

//service
import { EventService } from 'src/app/services/event.service';

//model
import { AddEvents } from '../../Model/addEvents';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css'],
})
export class AddeventComponent implements OnInit {
  //svg icons
  faPlusCircle = faPlusCircle;
  faTrashAlt = faTrashAlt;
  faUpload = faUpload;
  faEdit = faEdit;

  //Add event form Data
  eventName: string;
  description: string;
  location: string;
  category: string;
  type: string;
  startDate: string;
  endDate: string;
  maxParticipant: number;
  status:string = "In Progress";
  picture:string = "https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/no-image.jpg?alt=media&token=94024470-52dd-4457-810d-e6b437dfddb0";
  edit:boolean=false;

  //array of events of type AddEvents Interface.
  eventList: AddEvents[];
  eventAvailable:boolean=false;


  constructor(
    private eventService: EventService,
    private toast: ToastrService
  ) { }

  //everytime this component load in browser completely then noOnInit() execute.
  ngOnInit(): void {
    this.handleEventRetrival(this.status);
  }


  handleAddEvents(f:NgForm) {
    const event: AddEvents = {
      eventName: this.eventName,
      description: this.description,
      location: this.location,
      category: this.category.toUpperCase(),
      type: this.type.toUpperCase(),
      startDate: this.startDate,
      endDate: this.endDate,
      maxParticipant: this.maxParticipant,
      status: this.status,
      picture: this.picture,
      edit: this.edit
    };
    f.reset(); //reset form data after submiting
    this.eventService.postAddEventDetails(event).subscribe((postResponse) => {
      const resPost = JSON.parse(JSON.stringify(postResponse));
      if (resPost.status == 200) {
        this.toast.success('Event added successfully');
        this.handleEventRetrival(this.status);   //In Progress
       
      }
      else{
        this.toast.error("Problem occured while adding event");
      }
    });
  }


  handleEventRetrival(status:string){
    this.eventService.getAllEventsDetails(status).subscribe((getResponse) => {
      const resGet = JSON.parse(JSON.stringify(getResponse));
      if (resGet.status == 200) {
        this.eventList = resGet.allEvents;
        console.log(this.eventList)
        if(this.eventList.length){
          this.eventAvailable = true;
        }else
        {
          this.eventAvailable = false;
        }
      } else {
        this.toast.error('Error occured while retriving events');
      }
    });
  }


  handleEventDelete(id:number){
      
    this.eventService.deleteEvent(id).subscribe(deleteResponse =>{
      const resDel = JSON.parse(JSON.stringify(deleteResponse));
      if (resDel.status == 200) {
        this.toast.success("Deleted successfully");
        this.handleEventRetrival(this.status);
      } else {
        this.toast.error('Error occured while deleting event');
      }
    })
  }

  //Put request to change the status of event from "In Progress" to "Published"
  publishEvent(event:AddEvents){
    this.eventService.publishEvent(event).subscribe((putResponse)=>{
      const resPublish = JSON.parse(JSON.stringify(putResponse));
      if(resPublish.status==200){
        this.toast.success("Event published"); 
  //retriving event list based on status.
        this.handleEventRetrival(this.status);
      }else {
        this.toast.error('Error occured while publishing event');
      }
    })
  }

  clearData(f:NgForm){
    f.reset();
  }

  setPicture(){
    switch(this.category){
      case 'cricket':{
         this.picture = 'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/cricket.jpeg?alt=media&token=142af2aa-52c5-49ef-93e0-964bb3651e8d';
         break;
        }
        case 'football':{
          this.picture = 'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/football.jpg?alt=media&token=41fd1240-1e99-48f4-bbaf-afaffcf057cf';
          break;
         }
         case 'basketball':{
          this.picture = 'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/basketball.jpeg?alt=media&token=d1bad8a4-9246-4900-b00e-2fc1823b94d7';
          break;
         }
         case 'badmintion':{
          this.picture = 'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/badmintion.jpeg?alt=media&token=4f1feac8-fb9a-4b8a-a879-e600374a1286';
          break;
         }
         case 'chess':{
          this.picture = 'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/chess.jpeg?alt=media&token=506d50ee-fb2e-48cc-aac4-433394248fd0';
          break;
         }
         case 'vollyball':{
          this.picture = 'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/vollyball.jpeg?alt=media&token=43409a2d-464a-4981-a36a-d755575ad104';
          break;
         }
         case 'tableTennis':{
          this.picture = 'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/tableTennis.jpeg?alt=media&token=7dba7ea1-f52c-49e2-8693-8ce69633ad5e';
          break;
         }
         case 'carrom':{
          this.picture = 'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/carrom%20(2).jpg?alt=media&token=3c1c7fcf-073a-4d74-a8e3-ed18edcd52e4';
          break;
         }
         case '8ballpool':{
          this.picture = 'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/stephen-collins-cRhNdY9-2Sc-unsplash%20(1).jpg?alt=media&token=12532bb2-beb6-4b42-8428-8a088be3df8e';
          break;
         }
      default: {
        this.picture = 'https://firebasestorage.googleapis.com/v0/b/login-authentication-45ce5.appspot.com/o/no-image.jpg?alt=media&token=94024470-52dd-4457-810d-e6b437dfddb0';
        break;
      }
  }
  }




  editEvent(event:AddEvents){
    event.edit = !event.edit;
  }
}
