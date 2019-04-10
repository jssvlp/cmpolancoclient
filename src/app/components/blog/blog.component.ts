import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogService } from 'src/app/services/blog.service';
import { BlogModel } from 'src/app/model/Blog.model';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  agregar: any;
  addForm: FormGroup;
  
  constructor(private modalService: NgbModal, private FormBuilder: FormBuilder) { }

  ngOnInit() {
   
  }

  ver(agregar: any, modal) {
    this.agregar = agregar;
    this.modalService.open(modal);
  }
}
