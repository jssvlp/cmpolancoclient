import { Pipe, PipeTransform } from '@angular/core';
import { ForoModel } from 'src/app/model/foro.model';

@Pipe({
  name: 'filtroF'
})
export class FiltroFPipe implements PipeTransform {

  transform(value: ForoModel[], arg: any): any {
    const resultPosts= [];
    for(const post of value){
      if(post.tituloPublicacion.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPosts.push(post);
      }
    }
    return resultPosts;
  }

}
