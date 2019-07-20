    import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
    // import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
    import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
    import { HttpClient } from '@angular/common/http';
    import { HttpErrorResponse } from '@angular/common/http'
    // import { NgxSmartModalService } from 'ngx-smart-modal';
    import { environment } from '../../environments/environment';
    import * as moment from 'moment';
    import {} from 'googlemaps';
    import { ModalDirective } from 'ngx-bootstrap/modal';

    declare var $: any;
   
    // declare module 'googlemaps';
 

    @Component({
      selector: 'demo-datepicker-animated',
      templateUrl: './dashborad.component.html',
      styleUrls: ['./dashborad.component.css']
    })

    export class DashboradComponent implements OnInit {
      @ViewChild("placesRef") placesRef : GooglePlaceDirective;
      @ViewChild(ModalDirective) productModal: ModalDirective;
      @ViewChild('mapCanvas') mapElement: any;
      map: google.maps.Map;


      public selectCity: any;
      public address: any;
      public isProducts = false;
      
      private lat : any;
      private lng : any;
     

      public selectedDate: any;
      public cityOptions = ["Boston","Columns"];
      bsInlineValue = new Date();
      public arrProducts: any;
      public arrFilter1: any;
      public arrFilter2: any;
      public arrFilter3: any;

      constructor(private httpService: HttpClient ) {}
    
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
      onradioChanged(val): void
      {
        console.log('date',val);
          if(val=="noHousehold")
          {
            $("#radio1").removeClass("active");
            $("#radio2").addClass("active");

          }
          else
          {
            $("#radio2").removeClass("active");
            $("#radio1").addClass("active");
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

           this.map = new google.maps.Map(this.mapElement.nativeElement, {
             center: {
               lat:this.lat,
               lng:this.lng
              },
             zoom: 8,
             mapTypeControl: true,
             mapTypeControlOptions: {
                 style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                 position: google.maps.ControlPosition.LEFT_BOTTOM
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
          (data) => {
            console.log(data);

            
            
                this.isProducts = true;
                this.arrProducts = data['rooms'];
                this.renderMarker(this.arrProducts);
             
            
          
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

        var bounds = new google.maps.LatLngBounds();
        arr.filter((el)=>{

          let infoWindow = new google.maps.InfoWindow();
          let position = new google.maps.LatLng(el.lat, el.lng);
          bounds.extend(position);
          let marker = new google.maps.Marker({
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
          google.maps.event.addListener(marker, 'click', (function(marker, el) {
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
         
      //  arrFilter1
        this.arrFilter1 =[{"name":"Internet","fid":'internet'},
        {"name":"Private full bath","fid":'PrivateFullBath'},
        {"name":"Heaater","fid":'heaater'},
        {"name":"Washer","fid":'washer'},
        {"name":"Dryer","fid":'dryer'},
        {"name":"Private half bath","fid":'privateHalfBath'},
        {"name":"Air Conditioning","fid":'airConditioning'},
        {"name":"Cable TV","fid":'cableTV'},
        {"name":"Yard","fid":'yard'},
        {"name":"Parking","fid":'parking'},
        {"name":"Furnished room","fid":'furnishedRoom'},
        {"name":"Wheelchair accessible","fid":'wheelchairAccessible'}
        ];
      // arrFilter2
        this.arrFilter2=[
          {"name":"Has dog(s)","fid":'hasDog'},
          {"name":"Has cat(s)","fid":'hasCat'},
          {"name":"Has other pet(s)","fid":'hasOtherPet'},
          {"name":"Has on pet(s)","fid":'hasOnPet'}
        ];


          
           
      //arrFilter3
        this.arrFilter3=[
          {"name":"Smoking allowed","fid":'smokingAllowed'},
          {"name":"Pets allowed","fid":'petsAllowed'},
          {"name":"Couple friendly","fid":'CoupleFriendly'},
          
        ];
       
        // Display a map on the web page
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          center: {
            lat:42.3600825,
            lng: -71.05888010000001
           },
          zoom:8,
          mapTypeControl: true,
          mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: google.maps.ControlPosition.LEFT_BOTTOM
          },
      });
       
    
      this.map.setTilt(50);
          this.httpService.get(environment.apiUrl+'ajaxData').subscribe(
            (data) => {
              console.log(data);

              
                 
                  this.isProducts = true;
                  this.arrProducts = data['rooms'];
                  this.renderMarker(this.arrProducts);
               
              
            
            },
            (err: HttpErrorResponse) => {
              console.log (err.message);
            }
          );
        
      
 
   
        var boundsListener = google.maps.event.addListener(( this.map), 'bounds_changed', function(event) {
          google.maps.event.removeListener(boundsListener);
        });
     
        this.map.addListener('zoom_changed', function() {
          console.log(this.map)
        });
      
      }
    }

    
      