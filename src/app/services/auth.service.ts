import { Injectable } from  '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import { UserModel } from '../model/User.model';
import { ToastrService } from 'ngx-toastr';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {isNullOrUndefined} from 'util';



@Injectable({
    providedIn: 'root' 
})
export  class  AuthService {
    constructor(public Http: HttpClient, public  afAuth:  AngularFireAuth, private router: Router, private toastr: ToastrService, user: UserModel) {}
    Headers: HttpHeaders = new HttpHeaders({
        "Content-Type" : "application/json"
    });

    sendActivationCode(user: any ){
        user.sendEmailVerification().then(function() {
            this.router.navigate(['/home'])
          }).catch(function(error) {
            console.log(error);
          });
    
    }
    isLogged(){
        return this.afAuth.auth.currentUser;    
    }
    async Login(userInfo: any){
         try {
            console.log(userInfo);
          
            const userFirebase =  await  this.afAuth.auth.signInWithEmailAndPassword(userInfo.CorreoUsuario, userInfo.Contraseña)
            
           
            this.loginApi(userInfo)
                .subscribe(
                    user =>this.setUser(user));
           
            if(userFirebase.user.emailVerified){
                this.router.navigate(['/home'])
            }
            else
            {
                alert('Su usuario no esta verificado, revise su bandeja de entrada')
                this.logout();
            }
         } catch (e) {
             alert("Error al crear el usuario:"  +  e);
             console.log(e);
        }
    
    }

    loginApi(user: any){
        const url_api= "http://localhost:61756/api/usuarios/login"
        return this.Http
            .post(url_api,user, {headers: this.Headers})
            .pipe(data => data);
       
        //console.log();
    }
    
    async logout(){
        await this.afAuth.auth.signOut();
        let accesToken = localStorage.getItem("tnk");
        const url_api= `http://localhost:61756/api/usuarios/logout?acces_token=${accesToken}`;
        localStorage.removeItem("tkn");
        localStorage.removeItem("currentUser");
        this.router.navigate(['/home'])
        //this.router.navigate(['admin/login']);
    }

    setUser(user): void{
      
        let user_string = JSON.stringify(user);
        localStorage.setItem("currentUser", user_string);
        this.setToken(user.authToken);
    }

    setToken(token): void{
        localStorage.setItem("tkn", token);
    }

    getCurrentUser()
    {
        let user_string = localStorage.getItem("currentUser");
        if(!isNullOrUndefined(user_string)){
            let user = JSON.parse(user_string);
            return user;
        }
        else{
            return null;
        }
    }

    getToken(){
        return localStorage.getItem("tkn").toString();
    }

    RegisterOnApi(userInfo: any){
        const url_api = "http://localhost:61756/api/usuarios";
        //Insert in ApI
        return this.Http.post(url_api,userInfo,{headers : this.Headers}
        ).pipe(map(data => data));
        

    }

    async Register(userInfo: any){
        try {
            //Insert user in Firebase
            const user =  await  this.afAuth.auth.createUserWithEmailAndPassword(userInfo.CorreoUsuario, userInfo.Contraseña)
            let userUpdate = await  this.afAuth.auth.currentUser
            userUpdate.updateProfile({
                displayName: userInfo.NombreUsuario + ' '+ userInfo.ApellidosUsuario
            })
            
            this.sendActivationCode(this.afAuth.auth.currentUser);
            userInfo.FireBaseCode = userUpdate.uid;
            console.log(userInfo);
            
            this.RegisterOnApi(userInfo)
             .subscribe(user => {
                console.log(user);
              });;
            this.router.navigate(['/home'])
         } catch (e) {
             alert("Error al crear el usuario:"  +  e);
             console.log(e);
         }
    }

   

    
}



