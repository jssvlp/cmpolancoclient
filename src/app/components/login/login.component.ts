import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../../services/auth.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/User.model';
import { ToastrService } from 'ngx-toastr';
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  requestForm: FormGroup;

  constructor(private  authService:  AuthService, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder ) { }

  ngOnInit() {
    if(this.authService.getCurrentUser()){
      this.router.navigate(['/']);
    }
    else{
      this.requestForm = this.formBuilder.group({
        CorreoUsuario:['', Validators.required],
        Contraseña:['',Validators.required]
      })
    }
  }
  
  onLogin(){
   var user = this.authService.Login(this.requestForm.value)
                  .subscribe(
                    response => {
                     let _user = response['user_info'];

                    if(_user != null){
                      this.authService.setUser(_user);
                      this.authService.setToken(response["token"]);
                      this.router.navigate(['/home']);
                    }
                    else{
                      this.toastr.error('Correo o contraseña incorrecta','Inicio de sesion fallido');
                    }
                    
                    
                  },
                  error =>{
                    this.toastr.error('Ha ocurrido un error:' + error);
                  }
                );
  }

  onLogout(){

  }


}
