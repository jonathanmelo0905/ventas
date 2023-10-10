import { Pipe, PipeTransform } from '@angular/core';
import { Clients } from '../models/clients.models';

@Pipe({
  name: 'searchs'
})
export class SearchsPipe implements PipeTransform {

  transform(value: Clients[], arg: any): any {
    const resultFilter = [];
    for(const post of value){
      if((post.name.toUpperCase().indexOf(arg.toUpperCase()) > -1) || (post.email.toUpperCase().indexOf(arg.toUpperCase()) > -1) || (post.phone.indexOf(arg) != -1)){
        resultFilter.push(post);
      }
    }
    return resultFilter
  }

}
