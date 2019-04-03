import { Component, OnInit } from '@angular/core';
import { SolicitudModel } from '../../model/Solicitud.model';
import { ServicioModel } from '../../model/Servicio.model';
import { SolicitudService } from '../../services/solicitud.service';
import { ServiciosService } from '../../services/servicios.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/model/User.model';
import { ServicioSolicitudModel } from 'src/app/model/ServicioSolicitud.model';


@Component({
  selector: 'app-sservicio',
  templateUrl: './sservicio.component.html',
  styleUrls: ['./sservicio.component.css']
})
export class SservicioComponent implements OnInit {
  servicios: ServicioModel[]=[];
  requestForm: FormGroup;
  user: UserModel;
  data: ServicioSolicitudModel = new ServicioSolicitudModel();

  constructor(private formBuilder: FormBuilder, private solApi:SolicitudService, 
    private serApi:ServiciosService,private router: Router,public actRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.requestForm = this.formBuilder.group({
      fechaSolicitud:new Date().getDay(),
      fechaSolicitada: [''],
      comentario:[''],
      servicioID: [''],
      usuarioID: this.user.usuarioID
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
      this.data.solicitudID= res.solicitudID;
      console.log(this.data.solicitudID);
      this.data.estadoID = 2;
      this.solApi.addServicioSolicitud(this.data).subscribe(res =>{

      })
    });

  }

  getServicio(id: number){
    this.data.servicioID = id;
    
  }

}
