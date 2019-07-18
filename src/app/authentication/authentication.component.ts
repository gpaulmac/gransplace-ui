import { Component, OnInit } from '@angular/core';
import { LoginUser } from './login-user';
import { flatten } from '@angular/compiler';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  loading: boolean = false;
  loginUser: LoginUser = {
    name: '',
    password: ''
  };
  invalidCredentials : boolean;

  constructor(private route: ActivatedRoute, private router: Router) { } // Inject Router Serivce 

  ngOnInit() { }
  
  //Login routes setup
  login() {
    this.loading = true;
    if (this.loginUser.name == "admin" && this.loginUser.password == "admin123") {
      localStorage.setItem('currentUser', this.loginUser.name);
       this.router.navigate(['/dashborad']);
    }
    else { 
      this.loading = false;
      this.invalidCredentials = true;
    }
  }
}
