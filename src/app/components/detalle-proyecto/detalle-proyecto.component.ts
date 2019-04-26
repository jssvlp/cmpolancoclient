import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { ActivatedRoute } from '@angular/router';
import { ProyectoModel } from 'src/app/model/Proyecto.model';

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css']
})
export class DetalleProyectoComponent implements OnInit {

  ID: any;
  data: ProyectoModel;
  
  constructor(private proApi: ProyectoService, private actvRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.ID = this.actvRoute.snapshot.paramMap.get(' id');

    this.proApi.getProject(this.ID).subscribe(res =>{
      this.data = res;
      console.log(this.data);
    })

  }

}
