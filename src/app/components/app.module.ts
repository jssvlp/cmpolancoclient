import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, HostListener } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistryComponent } from './registry/registry.component';
import { LoginComponent } from './login/login.component';
import { BlogComponent } from './blog/blog.component';
import { ReactiveFormsModule, FormControl, FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule,HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../../environments/environment';
import { UserModel } from '../model/User.model';
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
import { AddpostComponent } from './addpost/addpost.component';
import { BlogboxmasComponent } from './blogboxmas/blogboxmas.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { VisitaComponent } from './visita/visita.component';
import { BlogcardComponent } from './blogcard/blogcard.component';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { DetalleSolicitudComponent } from '../components/detalle-solicitud/detalle-solicitud.component';
import { PeticionService } from '../services/peticion.service';
import { FooterComponent } from './footer/footer.component';
import { DetalleProyectoComponent } from './detalle-proyecto/detalle-proyecto.component';
import { CookieService } from 'ngx-cookie-service';
import { FiltroPipe } from './pipes/filtro.pipe';
import { ForoComponent } from './foro/foro.component';
import { CaracteristicaService } from '../services/caracteristica.service';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { ChatbComponent } from './chatb/chatb.component';
import { PostForoComponent } from './post-foro/post-foro.component';
import { TopicForoComponent } from './topic-foro/topic-foro.component';
import {NgxMaskModule} from 'ngx-mask';
import { SlickCarouselModule } from 'ngx-slick-carousel';



//Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DetalleForoComponent } from './detalle-foro/detalle-foro.component';
import { FiltroFPipe } from './pipes/filtro-f.pipe';
import { CarouselProductComponent } from './carousel-product/carousel-product.component';
import { AuthInterceptor } from '../services/jwt.interceptor';
import { OlvidarcontrasenaComponent } from './olvidarcontrasena/olvidarcontrasena.component';
import { CarouselComponent } from './carousel/carousel.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
 
}

const routes=[
  {
  path:'item', component:HomeComponent
}]
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
    PerfilComponent,
    BlogcardComponent,
    AddpostComponent,
    BlogboxmasComponent,
    VisitaComponent,
    BlogcardComponent,
    MapComponent,
    DetalleSolicitudComponent,
    FooterComponent,
    DetalleProyectoComponent,
    FiltroPipe,
    ForoComponent,
    NosotrosComponent,
    CalculadoraComponent,
    ChatbComponent,
    PostForoComponent,
    TopicForoComponent,
    DetalleForoComponent,
    FiltroFPipe,
    CarouselProductComponent,
    OlvidarcontrasenaComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
// tslint:disable-next-line: deprecation
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    FlatpickrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD78XDsaTmYP52DnxX3W4P00hBiDHNKgh8',
      libraries: ['places']
    }),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
        }
    }),
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
// tslint:disable-next-line: deprecation
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
    NgxPaginationModule,
    SlickCarouselModule
  ],
  providers: [
    AuthService, 
    UserModel, 
    ProyectoModel, 
    ProyectoService,
    SolicitudModel, 
    SolicitudService,
    ServicioModel, 
    ServiciosService, 
    PeticionService, 
    CookieService, 
    CaracteristicaService,
    AuthService,{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 }

