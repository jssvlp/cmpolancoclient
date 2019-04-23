import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { database } from 'firebase';
import { UserModel } from 'src/app/model/User.model';
import { SolicitudModel } from 'src/app/model/Solicitud.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  data: any;
  solicitud: SolicitudModel;


  constructor(private authSer: AuthService) { }

  ngOnInit() {
    this.authSer.getUser(this.authSer.getCurrentUser().usuarioID).subscribe(res => {
      this.data = res;
      this.solicitud = this.data.solicitud;
    });
    
  }
}
