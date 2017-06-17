import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
declare var System:any;

@Component({
    selector: 'modal-tfl-chart',
    templateUrl: 'modalTFLChart.component.html',
    exportAs: 'child6'

})
export class ModalTFLChartComponent implements AfterViewInit {

    @ViewChild('childModal') public childModal: ModalDirective;
    @ViewChild('lgModal') public lgModal: ModalDirective;

    constructor() {

        //console.log('Modal TFL Chart Loaded');
    }

    public show() {
        this.lgModal.show();
    }

    public hide() {
        this.lgModal.hide();
        sessionStorage.setItem('modal-tfl-chart', "1");
    }

    public showChildModal(): void {
        this.childModal.show();
    }

    public hideChildModal(): void {
        this.childModal.hide();
        sessionStorage.setItem('modal-tfl-chart', "1");
    }

    ngAfterViewInit() {

        //if(!sessionStorage.getItem('modal-tfl-chart')) {
        //this.lgModal.show();
        //}
    }


}
