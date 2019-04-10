import { Component, OnInit } from '@angular/core';
import { SolicitudModel } from '../../model/Solicitud.model';
import { ServicioModel } from '../../model/Servicio.model';
import { SolicitudService } from '../../services/solicitud.service';
import { ServiciosService } from '../../services/servicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/model/User.model';
import { ServicioSolicitudModel } from 'src/app/model/ServicioSolicitud.model';
import { EntidadModel } from 'src/app/model/Entidad.model';
import {formatDate} from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sservicio',
  templateUrl: './sservicio.component.html',
  styleUrls: ['./sservicio.component.css']
})
export class SservicioComponent implements OnInit {
  servicios: ServicioModel;
  requestForm: FormGroup;
  user: UserModel;
  data: EntidadModel = new EntidadModel();
  constructor(private formBuilder: FormBuilder, private solApi:SolicitudService, 
    private serApi:ServiciosService,private router: Router,public actRoute: ActivatedRoute, private authService: AuthService, private toastr: ToastrService) {
     }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.requestForm = this.formBuilder.group({
      fechaServSol:formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss', 'en'),
      fechaSol: [''],
      comentario:['', [Validators.required]],
      nombreServicio:[''],
      servicioID: [''],
      usuarioID: this.user.usuarioID
    });

    let userID = window.localStorage.getItem("SID");
    if(!userID){
      alert("Accion Invalida")
      this.router.navigate(['']);
      return;
    }
    window.localStorage.removeItem("SID");

    return this.serApi.getServicio(Number(userID))
      .subscribe(res => {
      this.servicios = res;
      this.requestForm.controls['nombreServicio'].setValue(this.servicios.nombreServicio);

    }, err => {
      console.log(err);
     
    });

  }

  onSubmit(){
    if(this.requestForm.get("comentario").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else{
      this.requestForm.controls['fechaSol'].setValue(formatDate(this.requestForm.get('fechaSol').value, 'yyyy/MM/dd HH:mm:ss', 'en'));
      this.requestForm.controls['servicioID'].setValue(this.servicios.servicioID);
      this.solApi.addSolicitud(this.requestForm.value).subscribe(res =>{
        this.router.navigate(['']);
        this.data.servicioID = this.servicios.servicioID;
        this.data.solicitudID = res.solicitudID;
        this.data.estadoID = 2;
        this.solApi.addServicioSolicitud(this.data).subscribe(res =>{
        })
      
      });
    }

  }

}
