import { Component, OnInit } from '@angular/core';
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { UserModel } from "../../model/User.model";
import { AuthService } from  '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $:any;
@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {
  form: FormGroup;
 
  constructor(private  authService:  AuthService,  private user: UserModel, private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService){ }

  ngOnInit() {
    if(this.authService.getCurrentUser()){
      this.router.navigate(['/']);
    }
    this.form = this.formBuilder.group({
      NombreUsuario:["",[Validators.required]],
      ApellidosUsuario: ["",[Validators.required]],
      CorreoUsuario: ["",[Validators.required]],
      Contraseña:["", [Validators.required]],
      fechaNacimiento:[""],
      confirmPassword:[""],
      numeroTelefono:["",[Validators.required]]
    })

    $(document).ready(function(){
      $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll >10) {
          $("#navbarSupportedContent").css("background" , "linear-gradient(to bottom, #2c2a22  0%, #2c2a22 100%)");
        }
        else{
          $("#navbarSupportedContent").css("background" , "transparent");

        }
      })
    })
  }

  onSubmit() {
    if(this.form.get('NombreUsuario').value.trim().length === 0){
      this.toastr.error('Favor de introducir un nombre de usuario valido');
    }
    else if(this.form.get('ApellidosUsuario').value.trim().length === 0){
      this.toastr.error('Favor de introducir un apellido de usuario valido');
    }
    else if(this.form.get('CorreoUsuario').value.trim().length === 0){
      this.toastr.error('Favor de introducir un correo valido');
    }
    else if(this.form.get('Contraseña').value.trim().length === 0){
      this.toastr.error('Favor de introducir una contraseña valida');
    }
    else if(this.form.get("confirmPassword").value != this.form.get("Contraseña").value){
      this.toastr.error('Las constraseñas no coinciden');
    }
    else if(this.form.get('numeroTelefono').value.length === 0){
      this.toastr.error('Favor de introducir un numero de telefono valido');
    }
    else{
      this.authService.Register(this.form.value);
    }
  } 

 

}
