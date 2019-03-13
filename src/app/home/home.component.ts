import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any
  constructor(private  authService:  AuthService ) { }

  async ngOnInit() {
    this.user = await this.authService.isLogged().displayName
    console.log(this.user.displayName);
    
  }

}
