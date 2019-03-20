import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistryComponent } from './registry/registry.component';
import { LoginComponent } from './login/login.component';
import { BlogComponent } from './blog/blog.component';
import { ForoComponent } from './foro/foro.component';
<<<<<<< HEAD
import { PerfilComponent } from './perfil/perfil.component';
import { SservicioComponent } from './sservicio/sservicio.component';
=======
import { ReactiveFormsModule, FormControl, FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { UserApiService } from "./services/user.api.service";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../environments/environment';
import {UserModel  } from "./model/User.model";

import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';


>>>>>>> 5346cb304002d3b9e5214dbede1a8cd8e50dc6fb

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    RegistryComponent,
    LoginComponent,
    BlogComponent,
    ForoComponent,
<<<<<<< HEAD
    PerfilComponent,
    SservicioComponent,
=======
    
    

>>>>>>> 5346cb304002d3b9e5214dbede1a8cd8e50dc6fb
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
    ToastrModule.forRoot() 
  ],
  providers: [AuthService,UserApiService, UserModel],
  bootstrap: [AppComponent]
})
export class AppModule { }
