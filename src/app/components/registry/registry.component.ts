import { Component, OnInit } from '@angular/core';
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { UserModel } from "../../model/User.model";
import { AuthService } from  '../../services/auth.service';
@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {
 
  constructor(private  authService:  AuthService,  private user: UserModel){ }

  ngOnInit() {

 
  }

  onSubmit(form : NgForm) {
    console.log(form);
    this.authService.Register(form.value);
  } 

 

}
