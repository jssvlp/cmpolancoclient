import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {formatDate} from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/model/User.model';
import config from '../../../config.js';
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
    this.user = this.authService.getCurrentUser();
  }

  ver(agregar: any, modal) {
    this.agregar = agregar;
    this.modalService.open(modal);
  }

 add(){
    //this.authService.change();
    window.location.href=config.admin+"/Agregar Post"
  }
}
