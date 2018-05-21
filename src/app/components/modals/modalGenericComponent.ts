import {Component, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
declare var System:any;

@Component({
  selector: 'modal-generic',
  templateUrl: 'modalGeneric.component.html',
  exportAs: 'child10'

})
export class ModalGenericComponent {

  @ViewChild('lgModal') public lgModal:ModalDirective;
  @Input() public message: string;
  @Output() public onShow:EventEmitter<any> = new EventEmitter();
  @Output() public onShown:EventEmitter<any> = new EventEmitter();
  @Output() public onHide:EventEmitter<any> = new EventEmitter();
  @Output() public onHidden:EventEmitter<any> = new EventEmitter();


  constructor(){

    //console.log('Modal DataJunkie Loaded');
    this.message = this.message || "No message was provided!";
    //console.log(this.message);

  }

  public show(){
    this.lgModal.show();
    this.onShow.next(true);
  }

  public hide(){

    this.lgModal.hide();
    this.onHide.next(true);
  }


}
