import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuard } from "../guards/auth.guard";

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistryComponent } from './registry/registry.component';
import { LoginComponent } from './login/login.component';
import { BlogComponent } from './blog/blog.component';
import { ForoComponent } from './foro/foro.component';
import { ReactiveFormsModule, FormControl, FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../../environments/environment';
import { UserModel  } from "../model/User.model";
import { ToastrModule } from 'ngx-toastr';
import { ProyectoModel } from '../model/Proyecto.model';
import { ProyectoService } from '../services/proyecto.service';
import { SolicitudModel } from '../model/Solicitud.model';
import { SolicitudService } from '../services/solicitud.service';
import { ServicioModel } from '../model/Servicio.model';
import { ServiciosService } from '../services/servicios.service';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from '../services/auth.service';
import { SservicioComponent } from './sservicio/sservicio.component';
import { PerfilComponent } from './perfil/perfil.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    RegistryComponent,
    LoginComponent,
    BlogComponent,
    ForoComponent,
    NavbarComponent,
    SservicioComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot() 
  ],
  providers: [AuthService, UserModel, ProyectoModel,ProyectoService,SolicitudModel,SolicitudService,ServicioModel,ServiciosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
