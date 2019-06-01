import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from 'src/app/model/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ActivatedRoute } from '@angular/router';
import { ForoService } from 'src/app/services/foro.service';
import { ForoModel } from 'src/app/model/foro.model';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {

  data: CategoriaModel[]=[];
  ID: any;
  post: ForoModel[] = [];
  filterPost = "";
  constructor(public ctgApi:CategoriaService, private actvRoute: ActivatedRoute, private foroApi: ForoService) { }

  ngOnInit() {
    this.ctgApi.getTemas().subscribe(res =>{
      this.data = res; 
    })

    this.ID = this.actvRoute.snapshot.paramMap.get(' id');
    if(this.ID != null){
      this.foroApi.getPostsT(this.ID).subscribe(res =>{
        this.post = [];
        this.post = res;
      })
    }

  }

  categoria(id: number){
    this.foroApi.getPostsT(id).subscribe(res =>{
      this.post = res;
    })
  }

}