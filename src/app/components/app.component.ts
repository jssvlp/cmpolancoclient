import { Component, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../model/User.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
  constructor(private autApi: AuthService){
  }


  unloadHandler() {
  }

  beforeUnloadHander() {
    this.autApi.logout();
  }

}
