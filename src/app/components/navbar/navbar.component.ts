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

    
  }
  onLogout(): void{
    this.authService.logout();
    this.logged = false;
    this.router.navigate(['/home'])

  }

  /*administrar(){
    this.authService.change();
    return "http://localhost:4500/"
  }*/
  onLogin(){

  }

}
