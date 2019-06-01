import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForoService } from 'src/app/services/foro.service';
import { ForoModel } from 'src/app/model/foro.model';
import { ComentarioModel } from 'src/app/model/comentario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/model/User.model';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-detalle-foro',
  templateUrl: './detalle-foro.component.html',
  styleUrls: ['./detalle-foro.component.css']
})
export class DetalleForoComponent implements OnInit {
  ID:any
  data: ForoModel;
  titulo: string = "";
  post: string = "";
  fecha: Date;
  autor:string = "";
  comentarios: ComentarioModel[] = [];
  addForm: FormGroup;
  user: UserModel;
  constructor(private actvRoute: ActivatedRoute, private foroApi: ForoService, private formBuilder: FormBuilder, private authApi: AuthService,private toastr: ToastrService,
    private commentApi: ComentarioService) { }

  ngOnInit() {
    this.user = this.authApi.getCurrentUser();
    this.ID = this.actvRoute.snapshot.paramMap.get(' id');
    if(this.ID != null){
      this.foroApi.getPost(this.ID).subscribe(res => {
        this.titulo = res.tituloPublicacion;
        this.post = res.textoPublicacion;
        this.fecha = res.timeStampForo;
        this.autor = res.usuario.nombreUsuario + " " + res.usuario.apellidosUsuario
        this.comentarios = res.cometariosForos;
        console.log(res);
      })
    }
  
    this.addForm = this.formBuilder.group({
      textoComentario:['', [Validators.required]],
      usuarioID: this.user.usuarioID,
      publicacionID: this.ID,
      timeStampComment: formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss', 'en'),
      urlImagen:[''] 
    });
  }

  onSubmit(){
    if(this.addForm.get("textoComentario").value.trim().length === 0){
      this.toastr.warning('Campo vacio');
    }
    else{
      this.commentApi.addComment(this.addForm.value).subscribe(res =>{

      })
    }

  }

}
