import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {

  faSignOutAlt = faSignOutAlt;
  constructor() { }

  ngOnInit(): void {
  }

}
