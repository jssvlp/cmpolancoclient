import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { logging } from 'protractor';
import { Router } from '@angular/router';
import config from '../../../config.js';
declare var $:any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  NombreUsuario: string;
  logged: boolean;
  roleID: number;
  urlAdmin: string;
  ngOnInit() {
    let currentUser = this.authService.getCurrentUser();
    this.urlAdmin = config.admin;
    if(currentUser === null){
      this.logged = false;
     
    }
    else{
      this.logged = true;
      this.NombreUsuario = currentUser['nombreUsuario'];
      this.roleID = currentUser['roleId'];  
    }    

    let route = this.router.url;
   if(route == '/home')
    {
      $(document).ready(function() {
        $("#navwrap").css("background" , "linear-gradient(to bottom, #2c2a22  0%, #2c2a22 100%)");

        $(window).scroll(function() {
           if($(this).scrollTop() > 80) { 
            $("#navwrap").css("background" , "transparent");
           } else {
            $("#navwrap").css("background" , "linear-gradient(to bottom, #2c2a22  0%, #2c2a22 100%)");
           }
        });
    });
    }  
    
    $(document).ready(function(){
      //$("#navwrap").css("background" , "linear-gradient(to bottom, #2c2a22  0%, #2c2a22 100%)");

      $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        let path = window.location.pathname 
        if(  path== '/home' || path == '/blog' )
        {
          console.log(route)
          if (scroll >60)  {
            $("#navwrap").css("background" , "linear-gradient(to bottom, #2c2a22  0%, #2c2a22 100%)");
          }
          else{
            $("#navwrap").css("background" , "transparent");
          }
        }
        
      })
    });
    
      

  }
  onLogout(): void{
    this.authService.logout();
    this.logged = false;
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
