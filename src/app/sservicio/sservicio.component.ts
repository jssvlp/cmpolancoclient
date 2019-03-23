import { Component, OnInit } from '@angular/core';
import { SolicitudModel } from '../model/Solicitud.model';
import { ServicioModel } from '../model/Servicio.model';
import { SolicitudService } from '../services/solicitud.service';
import { ServiciosService } from '../services/servicios.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sservicio',
  templateUrl: './sservicio.component.html',
  styleUrls: ['./sservicio.component.css']
})
export class SservicioComponent implements OnInit {
  servicios: ServicioModel[]=[];
  requestForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private solApi:SolicitudService, 
    private serApi:ServiciosService,private router: Router,public actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.requestForm = this.formBuilder.group({
      fechaSolicitud:[''],
      fechaSolicitada: [''],
      comentario:[''],
      servicioID:['']
    });

    return this.serApi.getServicios()
      .subscribe(res => {
      this.servicios = res;
    }, err => {
      console.log(err);
     
    });

  }

  onSubmit(){
    this.solApi.addSolicitud(this.requestForm.value).subscribe(res =>{
      this.router.navigate(['']);
    });
  }

}
