import { HttpInterceptor } from "@angular/common/http";


export class AuthInterceptor implements HttpInterceptor {
    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {

        const token = localStorage.getItem("token");

        if(token){
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + token)
            });

            return next.handle(cloned);  
        }
        else {
            return next.handle(req);
        }


    }


}