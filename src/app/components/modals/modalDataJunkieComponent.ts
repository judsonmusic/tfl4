import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {Router, ActivatedRoute} from "@angular/router";

declare var System:any;
@Component({
  selector: 'modal-data-junkie',
  templateUrl: 'modalDataJunkie.component.html',
  exportAs: 'child4'

})
export class ModalDataJunkieComponent implements AfterViewInit {

  @ViewChild('childModal') public childModal:ModalDirective;
  @ViewChild('lgModal') public lgModal:ModalDirective;

  constructor(public router: Router, private route:ActivatedRoute){

  }

  public show(){
    this.lgModal.show();
  }

  public hide(){
    //need to pass a flag to determine whether to hide this or not.
    if(this.router.url.indexOf('dashboard') > -1) {
      this.router.navigate(['/data-junkie']);
    }
    this.lgModal.hide();
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
