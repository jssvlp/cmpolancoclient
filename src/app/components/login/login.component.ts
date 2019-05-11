import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../../services/auth.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/User.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  requestForm: FormGroup;

  constructor(private  authService:  AuthService, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.requestForm = this.formBuilder.group({
      CorreoUsuario:['', Validators.required],
      Contraseña:['',Validators.required]
    })
  }
  
  onLogin(){
   var user = this.authService.Login(this.requestForm.value)
                  .subscribe(
                    user => {
                      console.log(user);
                    if(user != null){
                      this.authService.setUser(user);
                      this.authService.setToken(user['authToken']);
                      this.router.navigate(['/home']);
                    }
                    else{
                      this.toastr.error('Correo o contraseña incorrecta','Inicio de sesion fallido');
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
