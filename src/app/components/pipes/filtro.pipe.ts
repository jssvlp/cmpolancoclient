import { Pipe, PipeTransform } from '@angular/core';
import { BlogModel } from 'src/app/model/Blog.model';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: BlogModel[], arg: any): any {
    const resultPosts= [];
    for(const post of value){
      if(post.tituloEntrada.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPosts.push(post);
      }
    }
    return resultPosts;
  }
  
}
