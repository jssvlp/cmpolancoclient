import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {formatDate} from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/model/User.model';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
  agregar: any;
  addForm: FormGroup;
  fileTo: any
  user: UserModel;

  constructor(private modalService: NgbModal, private FormBuilder: FormBuilder, private authService: AuthService, private apiBlog: BlogService, private toastr: ToastrService) { }

  ngOnInit() {

    this.user = this.authService.getCurrentUser()
    console.log(this.user);
    this.addForm = this.FormBuilder.group({
      tituloEntrada:['', [Validators.required]],
      textoEntrada:['',[Validators.required]],
      imgURL:['',[Validators.required]],
      usuarioID: this.user.usuarioID,
      timestampBlog: formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss', 'en')
    });
  }

  ver(agregar: any, modal) {
    this.agregar = agregar;
    this.modalService.open(modal);
  }

  saveFileRequest(files : FileList){
    this.fileTo = files.item(0);
  }
  onSubmit(){
    if(this.addForm.get("tituloEntrada").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else if(this.addForm.get("textoEntrada").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else{
      this.apiBlog.addPost(this.addForm.value).subscribe(res=> {
        let formData = new FormData(); 
        formData.append(this.fileTo.name, this.fileTo);
        formData.append('fileName',this.fileTo.name);
        this.apiBlog.sendFormData(formData);
        this.apiBlog.refreshList();
      })
    }
  }
}
