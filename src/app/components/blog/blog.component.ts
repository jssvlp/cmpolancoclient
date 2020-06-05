import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogService } from 'src/app/services/blog.service';
import { BlogModel } from 'src/app/model/Blog.model';
import { Router } from '@angular/router';
declare var $:any;


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
  p:any;
  constructor(private modalService: NgbModal, private FormBuilder: FormBuilder, private apiBlog: BlogService, private router: Router) { }

  ngOnInit() {
    this.apiBlog.getBlogs().subscribe(res => {
      this.post = res;
    })

   /*  $(document).ready(function(){
      $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll >10) {
          $("#navbarSupportedContent").css("background" , "linear-gradient(to bottom, #2c2a22  0%, #2c2a22 100%)");
        }
        else{
          $("#navbarSupportedContent").css("background" , "transparent");

        }
      })
    }) */
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
