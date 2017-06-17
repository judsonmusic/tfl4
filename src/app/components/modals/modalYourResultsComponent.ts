import {Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';

declare var System:any;
@Component({
  selector: 'modal-results',
  templateUrl: 'modalYourResults.component.html',
  exportAs: 'child3'

})
export class ModalYourResultsComponent implements AfterViewInit {

  @ViewChild('childModal') public childModal:ModalDirective;
  @ViewChild('lgModal') public lgModal:ModalDirective;

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
    //this.lgModal2.show();
  }


}
