import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetService } from 'src/app/services/password-reset.service';
import PasswordResetRequest from 'src/app/model/PasswordResetRequest.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token: string;
  request = new PasswordResetRequest ;
  requestForm: FormGroup;
  validated: boolean = false;
  valid: boolean;
  error: string;
  validatedToken: string;
  user: string;
  isLoggedIn : Observable<boolean>;
  
  constructor(private router: Router,private  authService:  AuthService,private route: ActivatedRoute, private passwordResetService: PasswordResetService,private formBuilder: FormBuilder) { 
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
    

   this.token =  this.route.snapshot.paramMap.get('id')
   this.requestForm = this.formBuilder.group({
    password:['', Validators.required],
    confirmPass: ['',Validators.required]
  },)
   this.validateToken()
  }


  validateToken(){
     this.request.RecoveryToken = this.token;

     let response = this.passwordResetService.validateToken(this.request).subscribe(response =>{
       if(response.status === "success"){
         this.validated = true;
         this.valid = true;
         this.user = response.user
       }
       else{
        this.valid = false;
        this.error = response.message;
        console.log(this.error)
       }
     });
  }

  resetPassword(){
    let req = new PasswordResetRequest();
    req.RecoveryToken = this.token;
    req.UserId = this.user;
    req.Password = this.requestForm.value.password;
    this.passwordResetService.resetPassword(req).subscribe(response => {
      console.log(response);
    });
  }
}
