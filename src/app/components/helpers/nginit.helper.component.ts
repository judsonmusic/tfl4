import { Input, Directive } from '@angular/core';


@Directive({
  selector: '[ngInit]'
})

export class NgInitHelperComponent {
  @Input() ngInit;

  ngOnInit() {
    console.log('This is a test');
    if (this.ngInit) {

      setTimeout(function () {

        this.ngInit();

      }, 2000);

    }
  }
}
