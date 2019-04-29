import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogService } from 'src/app/services/blog.service';
import { BlogModel } from 'src/app/model/Blog.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  agregar: any;
  addForm: FormGroup;
  post: BlogModel[] =[]
  filterPost = "";
  constructor(private modalService: NgbModal, private FormBuilder: FormBuilder, private apiBlog: BlogService, private router: Router) { }

  ngOnInit() {
    this.apiBlog.getBlogs().subscribe(res => {
      this.post = res;
    })
  }

  verMas(p: BlogModel){
    window.localStorage.removeItem("blogID");
    window.localStorage.setItem("blogID", String(p.blogID));
    this.router.navigate(['/blogInfo']);
  }


  ver(agregar: any, modal) {
    this.agregar = agregar;
    this.modalService.open(modal);
  }
}
