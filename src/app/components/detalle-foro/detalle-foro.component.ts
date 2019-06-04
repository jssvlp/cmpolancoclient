import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  userpostID:number;
  comentarios: ComentarioModel[] = [];
  addForm: FormGroup;
  user: UserModel;
  temaID: number;
  editcomment: ComentarioModel = new ComentarioModel();
  idcomentario: number;
  idpost: number;
  postForm: FormGroup;
  usuarioID: number;
  userRole: number;

  constructor(private actvRoute: ActivatedRoute, private foroApi: ForoService, private formBuilder: FormBuilder, private authApi: AuthService,private toastr: ToastrService,
    private commentApi: ComentarioService, private router: Router) { }

  ngOnInit() {
    this.user = this.authApi.getCurrentUser();
    if(this.user == null){
      this.usuarioID = -1
      this.userRole = 0
    }
    else{
      this.usuarioID = this.user.usuarioID;
      this.userRole = this.user.roleId;
    }
    this.ID = this.actvRoute.snapshot.paramMap.get(' id');
    if(this.ID != null){
      this.foroApi.getPost(this.ID).subscribe(res => {
        this.titulo = res.tituloPublicacion;
        this.post = res.textoPublicacion;
        this.fecha = res.timeStampForo;
        this.autor = res.usuario.nombreUsuario + " " + res.usuario.apellidosUsuario
        this.comentarios = res.cometariosForos;
        this.userpostID = res.usuarioID;
        this.temaID = res.temaID;
      })
    }
  
    this.addForm = this.formBuilder.group({
      textoComentario:['', [Validators.required]],
      usuarioID: this.usuarioID,
      publicacionID: this.ID,
      timeStampComment: formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss', 'en'),
      urlImagen:[''] 
    });

    this.postForm = this.formBuilder.group({
      publicacionID: this.ID,
      tituloPublicacion: [''],
      textoPublicacion:['',[Validators.required]],
      timeStampForo: formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss', 'en'),
      archivado: false,
      urlImagen:[''],
      usuarioID: [''],
      temaID: ['']

    })
  }

  onSubmit(){
    if(this.addForm.get("textoComentario").value.trim().length === 0){
      this.toastr.warning('Campo vacio');
    }
    else{
      this.commentApi.addComment(this.addForm.value).subscribe(res =>{
        this.refrescar();
      })
    }

  }

  eliminar(){
    if(confirm('¿Esta seguro que desea eliminar este post?, tambien se borraran los comentarios existentes en este post.')){
      this.foroApi.deletePost(this.ID).subscribe(res =>{
        this.toastr.error('El post ha sido editada','Post.Eliminado');
        this.router.navigate(['foro']);
      });
    }
  }

  editar(c: ComentarioModel){
    this.idcomentario = c.comentarioID;
    this.addForm.controls["textoComentario"].setValue(c.textoComentario); 
  }

  onEdit(){
    if(this.addForm.get("textoComentario").value.trim().length === 0){
      this.toastr.warning('Campo vacio');
    }
    else{
      this.editcomment.comentarioID = this.idcomentario;
      this.editcomment.textoComentario = this.addForm.get("textoComentario").value;
      this.editcomment.timeStampComment = this.addForm.get("timeStampComment").value
      this.editcomment.urlImagen = this.addForm.get("urlImagen").value;
      this.editcomment.publicacionID = this.addForm.get("publicacionID").value;
      this.editcomment.usuarioID = this.addForm.get("usuarioID").value
      this.commentApi.updateComment(this.editcomment).subscribe(res =>{
        this.idcomentario = null;
        this.refrescar();
      })
    }
  }

  refrescar(){
    this.foroApi.getPost(this.ID).subscribe(res => {
      this.addForm.controls["textoComentario"].setValue(""); 
      this.titulo = res.tituloPublicacion;
      this.post = res.textoPublicacion;
      this.fecha = res.timeStampForo;
      this.autor = res.usuario.nombreUsuario + " " + res.usuario.apellidosUsuario
      this.comentarios = res.cometariosForos;
      this.userpostID = res.usuarioID;
      this.temaID = res.temaID;
    })
  }

  eliminarC(id: number){
    if(confirm('¿Esta seguro que desea eliminar este comentario?')){
    this.commentApi.deleteComment(id).subscribe(res=>{
      this.refrescar();
    })

  }
}

onEditP(){

  if(this.postForm.get("textoPublicacion").value.trim().length === 0){
    this.toastr.warning('Campo vacio');
  }

  else{
    
    this.postForm.controls["tituloPublicacion"].setValue(this.titulo);
    this.postForm.controls["usuarioID"].setValue(this.usuarioID);
    this.postForm.controls["temaID"].setValue(this.temaID);
    this.foroApi.updatePost(this.postForm.value).subscribe(res => {
      this.idpost = null;
      this.refrescar();
    })
  }

}

changeNo(){
  this.idpost = this.ID;
  this.postForm.controls["textoPublicacion"].setValue(this.post);
}

}
