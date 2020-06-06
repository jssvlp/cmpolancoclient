import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../model/User.model';
import { Router } from '@angular/router';


declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Frontend';


  constructor(private autApi: AuthService, private router:Router){


  }


  onDeactivate() {
    document.body.scrollTop = 0;
    // Alternatively, you can scroll to top by using this other call:
    // window.scrollTo(0, 0)
  }

  unloadHandler() {
  }

  beforeUnloadHander() {
    this.autApi.logout();
  }

  ngOnInit(){
   
  }

}
