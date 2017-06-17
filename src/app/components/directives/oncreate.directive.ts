import {Directive, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[onCreate]'
})
export class OnCreate implements OnInit{
  @Input() onCreate:Function;
  ngOnInit() {
    console.log('Directive Initialized. The value is: ', this.onCreate);
  }
}
