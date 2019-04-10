import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../../services/auth.service';
import { ProyectoModel } from '../../model/Proyecto.model';
import { ProyectoService} from '../../services/proyecto.service';
import { ServicioModel } from 'src/app/model/Servicio.model';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any
  data : ProyectoModel[]=[]
  servicio : ServicioModel[]=[]

  constructor(private  authService:  AuthService, private proyectoService:ProyectoService, private apiSer: ServiciosService,private router: Router ) { }

  async ngOnInit() {
    this.proyectoService.getProjects()
    .subscribe(res =>{
      this.data = res;
    }, err => {
      console.log(err);
    });
    
    this.apiSer.getServicios()
    .subscribe(res =>{
      this.servicio = res;
    }, err => {
      console.log(err);
    });
    
  
  }

  solicitud(s: ServicioModel){
    window.localStorage.removeItem("SID");
    window.localStorage.setItem("SID", String(s.servicioID));
    this.router.navigate(['solicitud']);
  }

}
