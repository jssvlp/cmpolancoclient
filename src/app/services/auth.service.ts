import { Injectable } from  '@angular/core';
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { registerContentQuery } from '@angular/core/src/render3';
import { UserModel } from '../model/User.model';
import {UserApiService} from '../services/user.api.service';
import { ToastrService } from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';


@Injectable({
    providedIn:  'root'
})
export  class  AuthService {
    
    constructor(public  afAuth:  AngularFireAuth, private router: Router, private userApiService: UserApiService, private toastr: ToastrService, user: UserModel) {

     }


    sendActivationCode(user: any ){
        user.sendEmailVerification().then(function() {
            alert('Se envio un correo de verificacion, por favor revisar la bandeja de entrada de: '+user.email)
            this.router.navigate(['/home'])
          }).catch(function(error) {
            console.log(error);
          });
    }
    isLogged(){
        return this.afAuth.auth.currentUser
            
          
    }



    async Login(userInfo: any){
         try {
            const user =  await  this.afAuth.auth.signInWithEmailAndPassword(userInfo.email, userInfo.password)
            if(user.user.emailVerified){
                this.router.navigate(['/home'])
            }
            else
            {
                alert('Su usuario no esta verificado, revise su bandeja de entrada')
                this.logout();
            }
            // console.log('user :', user);
             
         } catch (e) {
             alert("Error al crear el usuario:"  +  e);
             console.log(e);
             
        }
    
    }

    async logout(){
        await this.afAuth.auth.signOut();
        this.router.navigate(['/home'])
        //this.router.navigate(['admin/login']);
    }

    async Register(userInfo: any){
        try {
          
            const user =  await  this.afAuth.auth.createUserWithEmailAndPassword(userInfo.CorreoUsuario, userInfo.Contraseña)
            let userUpdate = await  this.afAuth.auth.currentUser
            userUpdate.updateProfile({
                displayName: userInfo.NombreUsuario + ' '+ userInfo.ApellidosUsuario
            })
            this.userApiService.addUser(userInfo).subscribe(res =>{
                this.toastr.success('Usuario registrado correctamente. Acceda a su correo electrónico para que confirme su cuenta.','');
               
              });

            
            
            alert("Usuario creado satisfactoriamente.");
             //console.log('user :',  this.afAuth.auth.currentUser);
             this.sendActivationCode(this.afAuth.auth.currentUser);
             this.router.navigate(['/home'])
          
             
         } catch (e) {
             alert("Error al crear el usuario:"  +  e);
             console.log(e);
             
         }
    }

    
}



