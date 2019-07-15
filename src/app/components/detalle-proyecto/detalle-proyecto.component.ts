import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { ActivatedRoute } from '@angular/router';
import { ProyectoModel } from 'src/app/model/Proyecto.model';
import { CaracteristicaModel } from 'src/app/model/Caracteristica.model';
import { CaracteristicaService } from 'src/app/services/caracteristica.service';
declare var $:any;
@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css']
})
export class DetalleProyectoComponent implements OnInit {

  ID: any;
  data: ProyectoModel;
  seguridad: CaracteristicaModel[];
  distribucion: CaracteristicaModel[];
  amenidades: CaracteristicaModel[];
  descripcionG: CaracteristicaModel[];
  descripcionA: CaracteristicaModel[];
  otros:CaracteristicaModel[];
  latitude:number;
  longitude:number;



  constructor(private proApi: ProyectoService, private actvRoute: ActivatedRoute, private carApi: CaracteristicaService ) { }

  ngOnInit() {
    this.ID = this.actvRoute.snapshot.paramMap.get(' id');

      this.proApi.getProject(this.ID).subscribe(res =>{
        console.log(res);
      this.data = res;  
      this.latitude = res.latitude;
      this.longitude = res.longitude;
      if(this.latitude != undefined || this.latitude != null)
      {
        localStorage.setItem('latitude', this.latitude.toString());
        localStorage.setItem('longitude', this.longitude.toString());
      } 
     
    })


    this.carApi.getCarProyecto(this.ID).subscribe(res =>{
      this.amenidades = res.amenidades;
      this.descripcionA = res.descripcionA;
      this.descripcionG = res.descripcionG;
      this.distribucion = res.distribucion;
      this.otros = res.otros;
      this.seguridad = res.seguridad;
      
    })


    $(document).ready(function(){
      $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll >10) {
          $("#navbarSupportedContent").css("background" , "linear-gradient(to bottom, #2c2a22  0%, #2c2a22 100%)");
        }
        else{
          $("#navbarSupportedContent").css("background" , "transparent");

        }
      })
    })

  }

}
