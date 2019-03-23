import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../../services/auth.service';
import { ProyectoModel } from '../../model/Proyecto.model';
import { ProyectoService} from '../../services/proyecto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any
  data : ProyectoModel[]=[]
  constructor(private  authService:  AuthService, private proyectoService:ProyectoService ) { }

  async ngOnInit() {
    this.proyectoService.getProjects()
    .subscribe(res =>{
      this.data = res;
      console.log(this.data);
    }, err => {
      console.log(err);
    });
    
  
  }

}
