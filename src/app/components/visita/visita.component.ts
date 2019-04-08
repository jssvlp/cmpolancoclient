import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html',
  styleUrls: ['./visita.component.css']
})
export class VisitaComponent implements OnInit {

  addForm : FormGroup;
  value: string;
  data: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private proService: ProyectoService, private authService: AuthService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      proyectoID:[''],
      hora_Inicio:[''],
      hora_Fin:[''],
      motivo:[''],
      descripcion:[''],
      solicitudID:['']
      });
  }

  OnSubmit(){
    //this.ageService.addVisit(this.addForm.value).subscribe(res =>{
    //this.router.navigate(['']);
    //});
  }

  select(event: any){
    this.value = event.target.value;
    if(this.value == "solicitud"){
     this.authService.getUser(this.authService.getCurrentUser().usuarioID).subscribe(res =>{
      this.data = res;
     }) 
    }

    if(this.value == "proyecto"){
      this.proService.getProjects().subscribe(res => {
        this.data = res;
      })
    }  
}

}
