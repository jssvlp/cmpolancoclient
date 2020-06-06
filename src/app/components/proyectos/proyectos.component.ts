import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { ProyectoModel } from 'src/app/model/Proyecto.model';
import config from '../../../config.js';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectos: ProyectoModel[] =[];
  fileserver: string
  constructor(private proyectosService: ProyectoService) { }

  ngOnInit() {
    this.fileserver = config.fileserver;
 
    this.getProyects();
  }

  getProyects(){
    this.proyectosService.getProjects().subscribe(response => {
      this.proyectos = response;
    });
  }

  updateUrl(event){
    console.log(event);
    //do your stuff
 }
}
