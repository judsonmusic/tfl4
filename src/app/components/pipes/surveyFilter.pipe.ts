import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'surveyFilter'
})
@Injectable()
export class SurveyFilterPipe implements PipeTransform {
  transform(items: any[], args: any[]): any {
    //console.log(items, args);

    return items.filter(item => item.id < 100);
  }
}
