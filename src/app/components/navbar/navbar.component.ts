import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { logging } from 'protractor';
import { Router } from '@angular/router';
import config from '../../../config.js';
import { Observable } from 'rxjs';

declare var $:any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  NombreUsuario: string;
  logged: boolean;
  roleID: number;
  urlAdmin: string;
  isLoggedIn : Observable<boolean>;
  fileserver: string;

  constructor(private authService: AuthService, private router: Router) { 

    this.isLoggedIn = this.authService.isLoggedIn();
  }
  

  ngOnInit() {
    this.fileserver = config.fileserver;
    let currentUser = this.authService.getCurrentUser();
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log(currentUser);

    this.urlAdmin = config.admin;

    if(currentUser === null){
      this.logged = false;
    }
    else{
      this.logged = true;
      this.NombreUsuario = currentUser['nombreUsuario'];
      this.roleID = currentUser['roleId'];  
    }    
  }

  onLogout(): void{
    this.authService.logout();
    this.router.navigate(['/home'])

  }
  onLogin(){

  }

  changeRoute(route)
  {
    if(route =='home' || route == "blog")
    {
      console.log('click route: is home');
      $(document).ready(function(){
        $("#navwrap").css("background" , "transparent");
      });
    }
    else{
      console.log('click route: not home, not blog');
      $(document).ready(function(){
        $("#navwrap").css("background" , "linear-gradient(to bottom, #2c2a22  0%, #2c2a22 100%)");
      });
    }
  }

}
