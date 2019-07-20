import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { ViewChild } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {
  @ViewChild('fileInput') fileInputVar: any; // get input="file" element from html
  displayLogin: boolean = true;
  displayFileUpload: boolean = false;
  userName: string;
  fileToUpload: File = null;

  constructor(private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {

    window.addEventListener('scroll', function(e) {
      let last_known_scroll_position = window.scrollY;
      
      if(last_known_scroll_position>75)
      {
        $(".navbar-fix").addClass('nav-hightlight');
      }
      else
      {
        $(".navbar-fix").removeClass('nav-hightlight');
      }
    });
    
  }

  openMobileView(){
    $(".nav-mobile-bar").toggle("showBox");
  }

  logout() {
    localStorage.setItem('currentUser', "");
    this.router.navigate(['/login']);
  }
 


}