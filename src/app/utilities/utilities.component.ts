import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.css']
})
export class UtilitiesService implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  apiUrl() {

    if (location.hostname.indexOf('localhost') > -1) {

      return '//localhost:3333';

    } else {

      return '//judsondesigns.dyndns.org:3333';
    }

  }

}
