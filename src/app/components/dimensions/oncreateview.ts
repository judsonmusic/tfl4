import {Directive, Input, OnInit, ElementRef} from '@angular/core';
import {AssessmentService} from "../assessment/assessment.service";

@Directive({
  selector: '[whencreateview]'
})
export class WhenCreateView implements OnInit{

  @Input() whencreateview:any;
  @Input() datamode:any;


  constructor(public el: ElementRef, public assessmentService: AssessmentService){

    this.el = el;
    this.assessmentService = assessmentService;

  }
  ngOnInit() {
    //console.log('WHENCREATEVIEW: The data mode is: ' , this.datamode, this.whencreateview);
    this.assessmentService.getHtmlForDimension(this.whencreateview).subscribe((html) =>{

      this.el.nativeElement.innerHTML = html;

    });
  }
}
