import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 import { LayoutComponent } from './layout/layout.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DashboradComponent } from './dashborad/dashborad.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { Directive, Component, OnInit, Input } from '@angular/core';

 
// import * as moment from 'moment';
// import { NgxDaterangepickerMd } from 'ngx-datepicker-material';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { NgxGoogleMapModule } from 'ngx-google-map';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ContentComponent,
    LayoutComponent,
    AuthenticationComponent,
    DashboradComponent,
  ],
  imports: [
    GooglePlaceModule,
    NgxGoogleMapModule,
    BrowserModule,
    AppRoutingModule,
    NgxSmartModalModule.forRoot(),
    ModalModule.forRoot(),
    HttpModule,
    HttpClientModule,
    FormsModule,
    SelectDropDownModule,
     BsDatepickerModule.forRoot(),
     BrowserAnimationsModule,
    
  ],
  providers: [ 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
