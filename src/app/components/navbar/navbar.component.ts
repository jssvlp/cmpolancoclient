import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { logging } from 'protractor';
declare var $:any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }
  NombreUsuario: string;
  logged: boolean;
  roleID: number;
  ngOnInit() {
    let currentUser = this.authService.getCurrentUser();
    
    if(currentUser === null){
      this.logged = false;
     
    }
    else{
      this.logged = true;
      this.NombreUsuario = currentUser['nombreUsuario'];
      this.roleID = currentUser['roleId']
  

      
    }

    
  }
  onLogout(): void{
    this.authService.logout()
        .subscribe( data => {
            this.logged = false;
        });
  }

  /*administrar(){
    this.authService.change();
    return "http://localhost:4500/"
  }*/
  onLogin(){

  }

}
