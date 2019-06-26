import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { BlogModel } from 'src/app/model/Blog.model';
import { UserModel } from 'src/app/model/User.model';
import { AuthService } from 'src/app/services/auth.service';
import config from '../../../config.js';
@Component({
  selector: 'app-blogboxmas',
  templateUrl: './blogboxmas.component.html',
  styleUrls: ['./blogboxmas.component.css']
})
export class BlogboxmasComponent implements OnInit {
  user:UserModel;
  post: BlogModel;
  constructor( private router: Router, private apiBlog: BlogService, private authService: AuthService) { }

  ngOnInit() {
    let userID = window.localStorage.getItem("blogID");
    if(!userID){
      alert("Accion Invalida")
      this.router.navigate(['blog']);
      return;
    }
    window.localStorage.removeItem("blogID");
    this.user = this.authService.getCurrentUser();

    this.apiBlog.getBlog(Number(userID)).subscribe(res => {
      this.post = res;
    })
  }
 eliminar(id: number){
  if(confirm('¿Esta seguro que desea eliminar este post')){
    this.apiBlog.deletePost(id).subscribe(res => {
      this.router.navigate(['/blog']);
    })
  }
}

editar(id: number){
  window.location.href=config.admin+"/editar-post/"+id;
}

}
