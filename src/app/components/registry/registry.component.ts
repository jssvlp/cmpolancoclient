import { Component, OnInit } from '@angular/core';
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { UserModel } from "../../model/User.model";
import { AuthService } from  '../../services/auth.service';
declare var $:any;
@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {
  form: FormGroup;
 
  constructor(private  authService:  AuthService,  private user: UserModel, private formBuilder: FormBuilder){ }

  ngOnInit() {
    this.form = this.formBuilder.group({
      NombreUsuario:["",[Validators.required]],
      ApellidosUsuario: ["",[Validators.required]],
      CorreoUsuario: ["",[Validators.required]],
      Contraseña:["", [Validators.required]],
      fechaNacimiento:[""],
      confirmPassword:[""]
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
    console.log(this.form.value)
    this.authService.Register(this.form.value);
  } 

 

}
