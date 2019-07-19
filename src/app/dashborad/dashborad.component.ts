    import { Component, OnInit,ViewChild } from '@angular/core';
    // import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
    import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
    import { HttpClient } from '@angular/common/http';
    import { HttpErrorResponse } from '@angular/common/http'
    import { environment } from '../../environments/environment';
    import * as moment from 'moment';
    declare var $: any;

    @Component({
      selector: 'demo-datepicker-animated',
      templateUrl: './dashborad.component.html',
      styleUrls: ['./dashborad.component.css']
    })

    export class DashboradComponent implements OnInit {
      @ViewChild("placesRef") placesRef : GooglePlaceDirective;


      public selectCity: any;
      public address: any;
      private map: any;
      private lat : any;
      private lng : any;
      public selectedDate: any;
      public cityOptions = ["Boston","Columns"];
      bsInlineValue = new Date();
      public arrProducts: string [];
      constructor(private httpService: HttpClient) {}
    
      // Inject Serivce

      // optional date changed callback
      onDateChanged(val): void
      {
          console.log('date',val);
          if(val=="")
          {
            $("#myDatePicker").removeClass("btn-highlight");
          }
          else
          {
            this.filterData();
            $("#myDatePicker").addClass("btn-highlight");
          }
        
      }

    
      

          
      public handleAddressChange(val) : void {
        // Do some stuff
        console.log(val);
        if(val!==null || val!==undefined)
        {
          
          this.lat =val.geometry.location.lat();
          this.lng =val.geometry.location.lng();
          this.address = val.formatted_address;

           this.map = new window.google.maps.Map(document.getElementById('mapCanvas'), {
             center: {
               lat:this.lat,
               lng:this.lng
              },
             zoom: 8,
             mapTypeId: 'roadmap',
             mapTypeControl: true,
             mapTypeControlOptions: {
                 style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                 position: window.google.maps.ControlPosition.LEFT_BOTTOM
             },
          });

          this.filterData();
        }

      }

      refreshData(){

        this.selectCity="";
        this.address="";
        this.selectedDate="";
          
        this.httpService.get(environment.apiUrl+'ajaxData').subscribe(
          data => {
            if(data.rooms!==undefined)
            {
              if(data.rooms.length>0)
              {
                this.arrProducts = data.rooms;
                this.renderMarker(this.arrProducts);
              }
            }
           
          },
          (err: HttpErrorResponse) => {
            console.log (err.message);
          }
        );

      }

    filterData()
    {

     
         let splitArr =  this.address.split(",");
         this.arrProducts.filter((el)=>{
               splitArr.forEach(element => {
                                
                 if(el.neighborhood.indexOf(element)>-1)
                  {
                     return el;
                  }

               });
           });
           console.log(this.arrProducts);
           this.renderMarker(this.arrProducts);


      }


      renderMarker(arr)
      {

        var bounds = new window.google.maps.LatLngBounds();
        arr.filter((el)=>{

          let infoWindow = new window.google.maps.InfoWindow();
          let position = new window.google.maps.LatLng(el.lat, el.lng);
          bounds.extend(position);
          let marker = new window.google.maps.Marker({
            position: position,
            map:  this.map,
            title: el.name
          });

           // Info window content
           let infoWindowContent = 
              '<div class="info_content">' +
                '<h3>'+el.name+'</h3>' +
                '<p>'+el.neighborhood+'</p>' + 
              '</div>';
              

          // Add info window to marker
          window.google.maps.event.addListener(marker, 'click', (function(marker, el) {
            return function() {
              infoWindow.setContent(infoWindowContent);
              infoWindow.open( this.map, marker);
            }
          })(marker, el));

          // Center the map to fit all markers on the screen
          this.map.fitBounds(bounds);

        });

      }

      

      ngOnInit() {
         
       
       
        // Display a map on the web page
        this.map = new window.google.maps.Map(document.getElementById('mapCanvas'), {
          center: {
            lat:42.3600825,
            lng: -71.05888010000001
           },
          zoom:25,
          mapTypeId: 'roadmap',
          mapTypeControl: true,
          mapTypeControlOptions: {
              style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: window.google.maps.ControlPosition.LEFT_BOTTOM
          },
      });
       
      this.map.setTilt(50);
      this.httpService.get(environment.apiUrl+'ajaxData').subscribe(
            data => {
              console.log(data);
              if(data.rooms!==undefined)
              {
                if(data.rooms.length>0)
                {
                  this.arrProducts = data.rooms;
                  this.renderMarker(this.arrProducts);
                }
              }
            
            },
            (err: HttpErrorResponse) => {
              console.log (err.message);
            }
          );
        
      
 
   
        var boundsListener = window.google.maps.event.addListener(( this.map), 'bounds_changed', function(event) {
          this.setZoom(14);
          window.google.maps.event.removeListener(boundsListener);
        });
      
      }
    }

    
      