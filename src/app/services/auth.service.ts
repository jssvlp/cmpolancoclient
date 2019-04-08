import { Injectable } from  '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import { UserModel } from '../model/User.model';
import { ToastrService } from 'ngx-toastr';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import {isNullOrUndefined} from 'util';
import { Observable, of } from 'rxjs';



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
     Login(userInfo: any){
         try {          
            const userFirebase = this.afAuth.auth.signInWithEmailAndPassword(userInfo.CorreoUsuario, userInfo.Contraseña);
            const url_api= "http://localhost:61756/api/usuarios/login";
            return this.Http
                       .post(url_api,userInfo, {headers: this.Headers})
                       .pipe(data => data);

         } catch (e) {
             alert("Error al crear el usuario:"  +  e);
             console.log(e);
        }
    
    }

    
     logout(){
        this.afAuth.auth.signOut();
        let accesToken = localStorage.getItem("tkn");
        const url_api= `http://localhost:61756/api/usuarios/logout/${accesToken}`;
        console.log('*******URL:',url_api);
        localStorage.removeItem("tkn");
        localStorage.removeItem("currentUser");

        return this.Http.post(
            url_api,{headers : this.Headers}
        ).pipe(data => data);
       
        //this.router.navigate(['/home'])
        //this.router.navigate(['admin/login']);
    }

    setUser(user:any): void{
      
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

    

    getUser(id: number){
    const url = `${"http://localhost:61756/api/usuarios"}/${id}`;
    return this.Http.get<UserModel>(url).pipe(
      tap(_ => catchError(this.handleError<UserModel>(`getUser id=${id}`))
    ));

    }

   
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
      
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
      
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
    
}



}