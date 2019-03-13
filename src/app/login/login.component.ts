import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../services/auth.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private  authService:  AuthService ) { }

  ngOnInit() {
  }




  onSubmit(form : NgForm) {

    this.authService.Login(form.value);
  } 
}
