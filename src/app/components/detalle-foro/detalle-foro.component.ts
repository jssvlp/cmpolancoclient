import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForoService } from 'src/app/services/foro.service';
import { ForoModel } from 'src/app/model/foro.model';

@Component({
  selector: 'app-detalle-foro',
  templateUrl: './detalle-foro.component.html',
  styleUrls: ['./detalle-foro.component.css']
})
export class DetalleForoComponent implements OnInit {
  ID:any
  data: ForoModel;

  constructor(private actvRoute: ActivatedRoute, private foroApi: ForoService) { }

  ngOnInit() {
    this.ID = this.actvRoute.snapshot.paramMap.get(' id');
    if(this.ID != null){
      this.foroApi.getPost(this.ID).subscribe(res => {
        this.data = res;
      })
    }
  }

}
