import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

//Ng-Prime
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';

//components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { AdminhomeComponent } from './pages/adminhome/adminhome.component';
import { UserhomeComponent } from './pages/userhome/userhome.component';
import { AddeventComponent } from './pages/addevent/addevent.component';
import { AdminheaderComponent } from './layouts/adminheader/adminheader.component';

//For HttpRequest
import {HttpClientModule} from '@angular/common/http'
//for working with forms
import { FormsModule } from '@angular/forms';
//for Toaster messages
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//fontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AnnounceWinnerComponent } from './pages/announce-winner/announce-winner.component';
import { PublishedComponent } from './pages/published/published.component';
import { UserheaderComponent } from './layouts/userheader/userheader.component';
import { EventsComponent } from './pages/events/events.component';





@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    SigninComponent,
    AdminhomeComponent,
    UserhomeComponent,
    AddeventComponent,
    AdminheaderComponent,
    AnnounceWinnerComponent,
    PublishedComponent,
    UserheaderComponent,
    EventsComponent,
  ],
  imports: [
    DropdownModule,
    InputTextModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
