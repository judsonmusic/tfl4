import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(items: Array<any>, filter: { [key: string]: any }, count: any): Array<any> {

    return items.filter(item => {
      let notMatchingField = Object.keys(filter)
        .find(key => item[key].toLowerCase() !== filter[key].toLowerCase());
      //console.log(notMatchingField)
      return !notMatchingField; // true if matches all fields
    });

    //transform(items: any[], searchText: string): any[] {
    /* console.log('Lets look!', searchText);
    if (!items) return [];
    if (!searchText || searchText == '' || Object.prototype.toString.call(searchText) === '[object Object]') return items;
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return item.firstName.toLowerCase().includes(searchText);
    }); */
  }
  /*   //console.log('Filtering: ' , items, filter);
    return items.filter(item => {
        let notMatchingField = Object.keys(filter)
                                     .find(key => item[key] !== filter[key]);

        return !notMatchingField; // true if matches all fields
    }); */
  //}

}
