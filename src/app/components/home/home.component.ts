import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../../services/auth.service';
import { ProyectoModel } from '../../model/Proyecto.model';
import { ProyectoService} from '../../services/proyecto.service';
import { ServicioModel } from 'src/app/model/Servicio.model';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any
  data : ProyectoModel[]=[]
  servicio : ServicioModel[]=[]

  constructor(private  authService:  AuthService, private proyectoService:ProyectoService, private apiSer: ServiciosService ) { }

  async ngOnInit() {
    this.proyectoService.getProjects()
    .subscribe(res =>{
      this.data = res;
      console.log(this.data);
    }, err => {
      console.log(err);
    });
    
    this.apiSer.getServicios()
    .subscribe(res =>{
      this.servicio = res;
      console.log(this.servicio);
    }, err => {
      console.log(err);
    });
    
  
  }

}
