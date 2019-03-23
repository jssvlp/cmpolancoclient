import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../../services/auth.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private  authService:  AuthService, private router: Router ) { }

  ngOnInit() {
  }
  
  onLogin(form : NgForm){
   var user = this.authService.Login(form.value)
                  .subscribe(
                    user => {
                    console.log(user);
                    this.authService.setUser(user);
                    this.authService.setToken(user['authToken']);
                    this.router.navigate(['/home']);
                  },
                  error =>{
                    console.log(error);
                  }
                );
              //console.log(user);
  }

  onLogout(){

  }


}
