import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AddEvents} from '../Model/addEvents'
import {winnersDetails} from '../Model/winnersDetails'

@Injectable({
  providedIn: 'root'
})
export class EventService {

  url:string="http://localhost:3000/api/events"

  constructor(
    private http:HttpClient
  ) { }

  postAddEventDetails(event:AddEvents){
    return this.http.post(this.url,event);
  }

  getAllEventsDetails(status:string){
    return this.http.get(this.url+`/${status}`);
  }

  deleteEvent(id:number){
    return this.http.delete(this.url+`/${id}`)
  }

  postWinnnerDetails(id:number,winnersDetails: winnersDetails){
    return this.http.post(this.url+`/${id}/winners`,winnersDetails);
  }

  publishEvent(event:AddEvents){
    return this.http.put(this.url+`/publish`,event);
  }

  editEvent(id:number,event:AddEvents){
    
  }
}
