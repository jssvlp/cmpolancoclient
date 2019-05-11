import { BlogcardComponent } from './blogcard/blogcard.component';
import { BlogboxmasComponent } from './blogboxmas/blogboxmas.component';
import { AddpostComponent } from './addpost/addpost.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistryComponent } from './registry/registry.component';
import { LoginComponent } from './login/login.component';
import { BlogComponent } from './blog/blog.component';
import { ForoComponent } from './foro/foro.component';
import { SservicioComponent } from './sservicio/sservicio.component';
import { PerfilComponent } from './perfil/perfil.component';

import { AuthGuard } from "../guards/auth.guard";
import { DetalleSolicitudComponent } from './detalle-solicitud/detalle-solicitud.component';
import { DetalleProyectoComponent } from './detalle-proyecto/detalle-proyecto.component';
import { NosotrosComponent } from './nosotros/nosotros.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'registry', component: RegistryComponent},
  {path: 'login', component: LoginComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'blogcard', component: BlogcardComponent},
  {path: 'addpost', component: AddpostComponent},
  {path: 'blogInfo', component: BlogboxmasComponent},
  {path: 'foro', component: ForoComponent},
  {path: 'solicitud', component:SservicioComponent,canActivate:[AuthGuard]},
  {path: 'perfil', component:PerfilComponent,canActivate:[AuthGuard]},
  {path: 'detalle-solicitud/: id', component: DetalleSolicitudComponent, canActivate:[AuthGuard]},
  {path: 'descripcion-proyecto/: id', component: DetalleProyectoComponent},
  {path: 'nosotros', component: NosotrosComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
