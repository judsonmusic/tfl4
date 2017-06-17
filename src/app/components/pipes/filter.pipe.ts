import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'myfilter'
})
@Injectable()
export class MyFilterPipe implements PipeTransform {
  transform(items: any[], args: any[]): any {
    //console.log(items, args);
    return items.filter(item => item.id === Number(args));
  }
}
