import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../../services/auth.service';
import { ProyectoModel } from '../../model/Proyecto.model';
import { ProyectoService} from '../../services/proyecto.service';
import { ServicioModel } from 'src/app/model/Servicio.model';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Router } from '@angular/router';
import { GenericdataService } from 'src/app/services/genericdata.service';
import { GenericData } from 'src/app/model/GenericData.model';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any
  whatsappUrl: any
  data : ProyectoModel[]=[]
  servicio : ServicioModel[]=[]
  genericData: GenericData[] = [];

  constructor(private  authService:  AuthService, private proyectoService:ProyectoService, private apiSer: ServiciosService,private router: Router,private GenericDataService:GenericdataService ) { }

  async ngOnInit() {
    this.GenericDataService.getAllGenericData().subscribe(res => {
      this.genericData = res;
      let numero  = this.getGenericDataByKey('telefono-whatsapp');
      this.whatsappUrl = `https://web.whatsapp.com/send?phone=${numero}&text=Hola quisiera más información sobre uno de sus proyectos`;    }); 

    this.proyectoService.getProjects()
    .subscribe(res =>{
      this.data = res;
    }, err => {
      console.log(err);
    });
    
    this.apiSer.getServicios()
    .subscribe(res =>{
      this.servicio = res;
    }, err => {
      console.log(err);
    });
    $(document).ready(function(){
      $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll >30) {
          $("#navbarSupportedContent").css("background" , "linear-gradient(to bottom, #2c2a22  0%, #2c2a22 100%)");
        }
        else{
          $("#navbarSupportedContent").css("background" , "transparent");

        }
      })
    })

    // $(document).ready(function(){
    //   $(window).scroll(function(){
    //     var scroll = $(window).scrollTop();
    //     if (scroll >230) {
    //       $("#wa").css("display" , "block");
    //     }
    //     else{
    //       $("#wa").css("display" , "none");

    //     }
    //   })
    // })
    
  
  }



  solicitud(s: ServicioModel){
    window.localStorage.removeItem("SID");
    window.localStorage.setItem("SID", String(s.servicioID));
    this.router.navigate(['solicitud']);
  }
  getGenericDataByKey(key){
    let value;
    for(let i = 0; i < this.genericData.length; i++){
      if(this.genericData[i]['key'] == key){
          value = this.genericData[i]['value']
      }
    }
    return value;
  }

}
