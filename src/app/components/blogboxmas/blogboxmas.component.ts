import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { BlogModel } from 'src/app/model/Blog.model';

@Component({
  selector: 'app-blogboxmas',
  templateUrl: './blogboxmas.component.html',
  styleUrls: ['./blogboxmas.component.css']
})
export class BlogboxmasComponent implements OnInit {

  post: BlogModel;
  constructor( private router: Router, private apiBlog: BlogService) { }

  ngOnInit() {
    let userID = window.localStorage.getItem("editUserID");
    if(!userID){
      alert("Accion Invalida")
      this.router.navigate(['blog']);
      return;
    }
    window.localStorage.removeItem("editUserID");

    this.apiBlog.getBlog(Number(userID)).subscribe(res => {
      this.post = res;
    })
  }

}
