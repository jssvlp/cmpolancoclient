import { Component, OnInit } from '@angular/core';
import { BlogModel } from 'src/app/model/Blog.model';
import { BlogService } from 'src/app/services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogcard',
  templateUrl: './blogcard.component.html',
  styleUrls: ['./blogcard.component.css']
})
export class BlogcardComponent implements OnInit {

  post: BlogModel[] =[]
  constructor(private apiBlog: BlogService, private router: Router) { }

  ngOnInit() {
    this.apiBlog.getBlogs().subscribe(res => {
      this.post = res;
      console.log(res);
    })
  }

  verMas(p: BlogModel){
    window.localStorage.removeItem("blogID");
    window.localStorage.setItem("blogID", String(p.blogID));
    this.router.navigate(['/blogInfo']);
  }

}
