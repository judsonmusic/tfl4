import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hear'
})
export class HearPipe implements PipeTransform {
  public ethnicities;
  public incomes;
  public education;
  public occupations;
  public hear;

  constructor() {

    this.hear = [

      { id: 1, value: 'Company' },
      { id: 2, value: 'Retreat or workshop' },
      { id: 3, value: 'Online' },
      { id: 4, value: 'Friend or family' },
      { id: 5, value: 'Coach' },
      { id: 6, value: 'School' },
      { id: 7, value: 'Amazon' }

    ];

  }
  transform(value: any, args?: any): any {
    var res = this.hear.filter(item => item.id = value)[0].value
    return res;
  }

}

@Pipe({
  name: 'ethnicity'
})
export class EthnicitiesPipe implements PipeTransform {
  public ethnicities;

  constructor() {


    this.ethnicities = [

      { id: 1, value: 'Caucasian' },
      { id: 2, value: 'Black or African American' },
      { id: 3, value: 'Hispanic' },
      { id: 4, value: 'Native American' },
      { id: 5, value: 'Asian' },
      { id: 6, value: 'Middle Eastern' },
      { id: 99, value: 'Other' }

    ];

  }
  transform(value: any, args?: any): any {
    var res = this.ethnicities.filter(item => item.id = value)[0].value
    return res;
  }

}

@Pipe({
  name: 'income'
})
export class IncomePipe implements PipeTransform {
  public incomes;


  constructor() {


    this.incomes = [

      { id: 1, value: '< 25k' },
      { id: 2, value: '25-50k' },
      { id: 3, value: '51-75k' },
      { id: 4, value: '75-100k' },
      { id: 5, value: '101-150k' },
      { id: 6, value: '151-250k' },
      { id: 7, value: '> 250k' }

    ];

  }
  transform(value: any, args?: any): any {
    var res = this.incomes.filter(item => item.id = value)[0].value
    return res;
  }

}

@Pipe({
  name: 'education'
})
export class EducationPipe implements PipeTransform {

  public education;


  constructor() {


    this.education = [

      { id: 1, value: 'High school freshman' },
      { id: 2, value: 'High school sophomore' },
      { id: 3, value: 'High school junior' },
      { id: 4, value: 'High school senior' },
      { id: 5, value: 'High school diploma/GED' },
      { id: 6, value: 'College freshman' },
      { id: 7, value: 'College sophomore' },
      { id: 8, value: 'College junior' },
      { id: 9, value: 'College senior' },
      { id: 10, value: 'Certified in a specific skill' },
      { id: 11, value: 'Undergraduate' },
      { id: 12, value: 'Masters or graduate degree' },
      { id: 13, value: 'Doctorate or Ph.D.' },
      { id: 99, value: 'Other' }

    ];

  }
  transform(value: any, args?: any): any {
    var res = this.education.filter(item => item.id = value)[0].value
    return res;
  }

}


@Pipe({
  name: 'occupation'
})
export class OccupationPipe implements PipeTransform {

  public occupations;

  constructor() {

    this.occupations = [

      { id: 1, value: 'Student' },
      { id: 2, value: 'CEO of my household' },
      { id: 3, value: 'Business owner' },
      { id: 4, value: 'C-suite executive' },
      { id: 5, value: 'Manager' },
      { id: 6, value: 'Administrative' },
      { id: 7, value: 'Operations' },
      { id: 8, value: 'Account manager' },
      { id: 9, value: 'Sales' },
      { id: 10, value: 'Skilled labor' },
      { id: 11, value: 'IT specialist' },
      { id: 12, value: 'Consultant' },
      { id: 13, value: 'Education' },
      { id: 14, value: 'Law enforcement' },
      { id: 15, value: 'Fireman' },
      { id: 16, value: 'Counselor or coach' },
      { id: 17, value: 'Healthcare professional' },
      { id: 18, value: 'Lawyer/paralegal' },
      { id: 19, value: 'Athlete' },
      //{ id: 20, value: 'Performer' },
      { id: 21, value: 'Artist' },
      { id: 22, value: 'Retiree' },
      { id: 23, value: 'Hospitality' },
      { id: 24, value: 'Service position' },
      { id: 25, value: 'Active duty military' },
      { id: 26, value: 'Veteran' },
      { id: 27, value: 'Finance' },
      { id: 28, value: 'Customer service' },
      { id: 29, value: 'Retail' },
      { id: 30, value: 'Public service ' },
      { id: 31, value: 'Marketing' },
      { id: 32, value: 'Engineer' },
      { id: 33, value: 'Fitness professional' },
      { id: 34, value: 'Unemployed' },
      { id: 99, value: 'Other' }

    ];

  }
  transform(value: any, args?: any): any {
    var res = this.occupations.filter(item => item.id = value)[0].value
    return res;
  }

}


