import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PasswordResetService } from 'src/app/services/password-reset.service';
import { ThrowStmt } from '@angular/compiler';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  emailForm:FormGroup;
  isLoggedIn : Observable<boolean>;
  success: boolean;
  message: string;
  @ViewChild('myModal') contenidoDelModal ;

  constructor(private toastr: ToastrService,private  authService:  AuthService, private router: Router,private formBuilder: FormBuilder, private passordResetService: PasswordResetService,private el: ElementRef,private modalService: NgbModal) {
    this.isLoggedIn = this.authService.isLoggedIn();
   }

   
  openModal() {
    this.modalService.open(this.contenidoDelModal);
  }

  closeModal(){
    console.log('blablabla :>> ');
    this.modalService.dismissAll('aasd');
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
      this.emailForm = this.formBuilder.group({
        CorreoUsuario:['', Validators.required],
      })
    }
  }

  onRequest(){
    let user = {
      Email : this.emailForm.value.CorreoUsuario
    }
    this.passordResetService.requestPasswordReset(user).subscribe(response =>{
      console.log(response);
      if(response.status === 'success'){
        this.openModal();
        this.message = response.message;
        this.success = true;
      }
      else{
        this.toastr.warning(response.message);
      }
    });
    
  }




  
}
