import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from 'src/app/model/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/model/User.model';
import { ToastrService } from 'ngx-toastr';
import { ForoService } from 'src/app/services/foro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-foro',
  templateUrl: './post-foro.component.html',
  styleUrls: ['./post-foro.component.css']
})
export class PostForoComponent implements OnInit {

  data: CategoriaModel[]=[];
  addForm: FormGroup;
  fileTo: any
  user: UserModel

  constructor(public ctgApi:CategoriaService, private formBuilder: FormBuilder, public authApi: AuthService,private toastr: ToastrService, private foroApi: ForoService, private router: Router) { }

  ngOnInit() {
    this.ctgApi.getTemas().subscribe(res =>{
      this.data = res; 
    })

    this.user = this.authApi.getCurrentUser();

    this.addForm = this.formBuilder.group({
      tituloPublicacion: ['',[Validators.required]],
      textoPublicacion:['', [Validators.required]],
      timeStampForo: formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss', 'en') ,
      archivado: false,
      urlImagen:[''],
      usuarioID: this.user.usuarioID,
      temaID:['']
    });
    
  }

  saveFileRequest(files : FileList){
    this.fileTo = files.item(0);
  }

  onSubmit(){
    if(this.addForm.get(" tituloPublicacion").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else if(this.addForm.get("textoPublicacion").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else{
      this.foroApi.addPost(this.addForm.value).subscribe(res=> {

        if(this.fileTo != null){
        let formData = new FormData(); 
        formData.append(this.fileTo.name, this.fileTo);
        formData.append('fileName',this.fileTo.name);
        this.foroApi.sendFormData(formData);
        }
        
        this.router.navigate(['foro']);
      })
    }
  }



}
