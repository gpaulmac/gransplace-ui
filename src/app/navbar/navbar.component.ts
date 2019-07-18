import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { ViewChild } from '@angular/core';

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
    
  }

  logout() {
    localStorage.setItem('currentUser', "");
    this.router.navigate(['/login']);
  }
 


}