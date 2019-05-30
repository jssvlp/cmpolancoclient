import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from 'src/app/model/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {

  data: CategoriaModel[]=[];

  constructor(public ctgApi:CategoriaService) { }

  ngOnInit() {
    this.ctgApi.getTemas().subscribe(res =>{
      this.data = res; 
    })
  }

}