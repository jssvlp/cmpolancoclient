import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { SolicitudModel } from 'src/app/model/Solicitud.model';
import { ServicioSolicitudModel } from 'src/app/model/ServicioSolicitud.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicioModel } from 'src/app/model/Servicio.model';
import { PeticionService } from 'src/app/services/peticion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle-solicitud',
  templateUrl: './detalle-solicitud.component.html',
  styleUrls: ['./detalle-solicitud.component.css']
})
export class DetalleSolicitudComponent implements OnInit {
  ID: any
  data: ServicioSolicitudModel;
  requestForm: FormGroup;
  constructor(private actvRoute: ActivatedRoute, private solApi: SolicitudService, private formBuilder: FormBuilder,private router: Router, private ptcApi: PeticionService, 
    private toastr: ToastrService) { }

  ngOnInit() {
    this.ID = this.actvRoute.snapshot.paramMap.get(' id');
    this.solApi.getServSol(this.ID).subscribe(res => {
      this.data = res;
      console.log(this.data);
    })

    this.requestForm = this.formBuilder.group({
      motivo: ["", [Validators.required]],
      comentario:["",[Validators.required]],
      solicitudID: this.ID,
      estado:[""]
    });

  }

  cancelar(){
    if(confirm("¿Estas seguro que deseas cancelar el servicio?")){
      this.data.estadoID = 7;
      this.solApi.updateServSol(this.data).subscribe(res =>{
        this.toastr.success('Servicio cancelado exitosamente');
      })
      this.router.navigate(['perfil']);
    }
  }

  onSubmit(){
    if(this.requestForm.get("motivo").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else if(this.requestForm.get("comentario").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else{
    if(confirm("¿Estas seguro que deseas enviar la peticion para cancelar el servicio?")){
        this.requestForm.controls['estado'].setValue("Pendiente");
        this.ptcApi.addPeticion(this.requestForm.value).subscribe(res => {
          if(res == null){
            this.toastr.error('Existe una peticion aun pentiende de esta solicitud');
          }
          else {
            this.toastr.success('Peticion creada con exito');
            this.router.navigate(['perfil']);
          }
        })
      }
    }
  }

}
