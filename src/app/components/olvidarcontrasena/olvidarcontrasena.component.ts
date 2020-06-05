import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-olvidarcontrasena',
  templateUrl: './olvidarcontrasena.component.html',
  styleUrls: ['./olvidarcontrasena.component.css']
})
export class OlvidarcontrasenaComponent implements OnInit {
  requestForm:FormGroup;
  isLoggedIn : Observable<boolean>;

  constructor(private  authService:  AuthService, private router: Router,private formBuilder: FormBuilder) {
    this.isLoggedIn = this.authService.isLoggedIn();
   }

  ngOnInit() {
    let loged;
    this.isLoggedIn.subscribe((val) =>{
      loged = val;
    });
    
    
    if(loged){
      this.router.navigate(['/']);
    }
    else{
      this.requestForm = this.formBuilder.group({
        CorreoUsuario:['', Validators.required],
      })
    }
  }
  onSubmit(){

  }


}
