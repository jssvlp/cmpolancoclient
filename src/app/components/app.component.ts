import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../model/User.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  selectedLanguage = 'en';

  constructor(private autApi: AuthService, private router:Router, private translateService: TranslateService){
    this.translateService.setDefaultLang(this.selectedLanguage);
    this.translateService.use(this.selectedLanguage);

  }

  toogleLanguage(lang: string) {
    this.translateService.use(lang);
  }


  unloadHandler() {
  }

  beforeUnloadHander() {
    this.autApi.logout();
  }

  ngOnInit(){
   
  }

}
