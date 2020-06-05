import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}
  canActivate(){
    //Con cookies
    
    if(this.authService.getCurrentUser()){
      return true;
    }
    else{
      
      this.router.navigate(['/login']);
      return false;
    }
       
    

    /*if(this.authService.getCurrentUser()){
      return true;
    }
    else{
      this.authService.set();
      if(this.authService.getCurrentUser()){
        return true;
      }
      else{
        this.router.navigate(['/login']);
      return false;
      }
      
    }*/
  }
   
}
