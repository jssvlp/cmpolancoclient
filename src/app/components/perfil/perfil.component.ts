import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { database } from 'firebase';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  data: any[]=[]
  constructor(private authSer: AuthService) { }

  ngOnInit() {
    this.data = this.authSer.getCurrentUser(); 
    console.log(this.authSer.getCurrentUser());
  }

}
