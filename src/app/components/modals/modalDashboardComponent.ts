import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
declare var System:any;

@Component({
  selector: 'modal-dashboard',
  templateUrl: 'modalDashboard.component.html',
  exportAs: 'child'
})
export class ModalDashboardComponent implements AfterViewInit {

  @ViewChild('childModal') public childModal:ModalDirective;
  @ViewChild('lgModal') public lgModal:ModalDirective;

  constructor(){

    //console.log('Modal Demo Loaded');
  }

  public show(){

    //console.log('Show modal!');
    this.lgModal.show();
  }

  public hide(){
    //console.log('Hide modal!');
    sessionStorage.setItem('modal-demo', '1');
    this.lgModal.hide();

  }

  public showChildModal():void {
    //this.childModal.show();
  }

  public hideChildModal():void {
    //this.childModal.hide();
  }

  ngAfterViewInit() {

    if(!sessionStorage.getItem('modal-demo')) {
      //this.lgModal.show();
    }
  }


}
