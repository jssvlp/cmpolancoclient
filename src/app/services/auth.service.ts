import { Injectable } from  '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import { UserModel } from '../model/User.model';
import { ToastrService } from 'ngx-toastr';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import {isNullOrUndefined} from 'util';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import config from '../../config.js';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
    providedIn: 'root' 
})
export  class  AuthService {


    constructor(public Http: HttpClient, public  afAuth:  AngularFireAuth, private router: Router, private toastr: ToastrService, user: UserModel,private cookieService: CookieService) {}


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
        let user = {
            email : userInfo.CorreoUsuario,
            password : userInfo.Contraseña
        }
        let url_api = config.api+"/Auth/Login";

        return this.Http.post(url_api,user,httpOptions).pipe(map(data => data));    
    }

    
     logout(){
        this.cookieService.deleteAll();
       
    }

    setUser(user:any): void{
        let user_string = JSON.stringify(user);  

        this.cookieService.set('currentUser', user_string);

        this.setToken(user.authToken);
    }

    setToken(token): void{
        //Con cookies
        
        this.cookieService.set('tkn', token);
        
        //sessionStorage.setItem('tkn', token);
    }

    getCurrentUser()
    {
        //Con cookies
        
            let user_string = this.cookieService.get("currentUser");
            if(!isNullOrUndefined(user_string) && user_string != ""){
            let user = JSON.parse(user_string);
            return user;
        }
        else{
            return null;
        }
        
    }

    getToken(){
        //Con cookies
        
        return this.cookieService.get("tkn").toString();
        
        //return sessionStorage.getItem("tkn").toString();
    }

    RegisterClientOnApi(userInfo: any){
        console.log(userInfo);
        let cliente = {
            Nombre :userInfo.NombreUsuario,
            Apellidos : userInfo.ApellidosUsuario,
            Email : userInfo.CorreoUsuario,
            FechaNacimiento : userInfo.fechaNacimiento
        }
        const url_api = config.api+"/clientes";
        //Insert in ApI
        return this.Http.post(url_api,cliente,httpOptions
        ).pipe(map(data => data));
    }

    async Register(userInfo: any){
            let cliente = {
            username : userInfo.CorreoUsuario,
            password : userInfo.Contraseña,
            type : "cliente",
            email : userInfo.CorreoUsuario
            };

            this.createUserOnApi(cliente).subscribe(res =>{
                if(res['status'] == "success"){
                    this.cookieService.set('tkn',res['token']);

                    this.RegisterClientOnApi(userInfo)
                    .subscribe(response => {
                        let cliente = JSON.stringify(response['cliente']);
                        this.cookieService.set("currentUser",cliente);  
                    });
                    this.router.navigate(['/home']);
                }
                else 
                {
                    this.toastr.error("El correo especificado ya esta en uso", "Usuario.Registro");
                }
            });

            
        
    }

    createUserOnApi(user:any)
    {
        const urlApi = config.api+"/Auth/Create";

        return this.Http.post(urlApi,user,httpOptions).pipe(map(data => data));
    }

    getUser(id: number){
    const url = `${config.api+"clientes"}/${id}`;
    return this.Http.get<UserModel>(url).pipe(
      tap(_ => catchError(this.handleError<UserModel>(`getClient id=${id}`))
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
export interface User {
    email: string;
    password: string;
}