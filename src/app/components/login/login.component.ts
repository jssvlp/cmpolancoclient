import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../../services/auth.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/User.model';
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
                    if(user != null){
                      this.authService.setUser(user);
                      this.authService.setToken(user['authToken']);
                      this.router.navigate(['/home']);
                    }
                    else{
                      console.log("Usuario o contraseña incorrecta");
                    }
                    
                    
                  },
                  error =>{
                    console.log(error);
                  }
                );
  }

  onLogout(){

  }


}
