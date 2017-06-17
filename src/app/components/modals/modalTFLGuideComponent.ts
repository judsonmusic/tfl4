import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';

declare var System:any;
@Component({
  selector: 'modal-tfl-guide',
  templateUrl: 'modalTFLGuide.component.html',
  exportAs: 'child5'

})
export class ModalTFLGuideComponent implements AfterViewInit {

  @ViewChild('childModal') public childModal:ModalDirective;
  @ViewChild('lgModal') public lgModal:ModalDirective;

  constructor(){

    //console.log('Modal TFL Guide Loaded');
  }

  public show(){
    this.lgModal.show();
  }

  public showChildModal():void {
    this.childModal.show();
  }

  public hideChildModal():void {
    this.childModal.hide();
  }

  ngAfterViewInit() {

    //if(!sessionStorage.getItem('modal-tfl-guide')) {
      this.lgModal.show();
    //}
  }


}
