import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from 'src/app/model/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-topic-foro',
  templateUrl: './topic-foro.component.html',
  styleUrls: ['./topic-foro.component.css']
})
export class TopicForoComponent implements OnInit {

  data: CategoriaModel[]=[];

  constructor(public ctgApi:CategoriaService) { }

  ngOnInit() {

    this.ctgApi.getTemas().subscribe(res =>{
      this.data = res; 
    })
  }

}
