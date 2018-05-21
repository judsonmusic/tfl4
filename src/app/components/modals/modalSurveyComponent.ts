import { AssessmentService } from './../assessment/assessment.service';
import { SurveyService } from './../a-survey/survey.service';
import { Component, ViewChild, AfterViewInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { Router } from "@angular/router";
import { ModalDirective } from 'ngx-bootstrap';
import { UserService } from "../user-service/user.service";
declare var System: any;

//import $ from 'jquery/dist/jquery';

@Component({
    selector: 'modal-survey',
    templateUrl: 'modalSurvey.component.html',
    exportAs: 'child6'
})
export class ModalSurveyComponent implements AfterViewInit {
    @Input() assessmentData: any;
    @ViewChild('lgModal') public lgModal: ModalDirective;
    @Output() public onShow: EventEmitter<any> = new EventEmitter();
    @Output() public onShown: EventEmitter<any> = new EventEmitter();
    @Output() public onHide: EventEmitter<any> = new EventEmitter();
    @Output() public onHidden: EventEmitter<any> = new EventEmitter();

    public survey_questions;
    public survey_answers;
    public surveyComplete: boolean;
    public surveySubmitted;

    constructor(public userService: UserService, public surveyService: SurveyService, private router: Router, public changeRef: ChangeDetectorRef, public assessmentService: AssessmentService) {
        //we need to take the assessment data into this function then udpate it when they complete the survey...

        this.userService = userService;
        this.surveyService = surveyService;
        this.survey_questions = surveyService.questions;
        this.survey_answers = surveyService.answers;
        this.surveySubmitted = false;
    }
   

    checkComplete() {

        this.surveyComplete = false;
        //first check to see if we have valid survey data. If not, fix it!

        //do nothing, we have data...  
        let complete = [];
        this.assessmentData.survey.map((item, index) => {
            //console.log(item, index);
            if ((item.id < 100 && item.answer != '') || item.id == 101) {

                complete.push(true);

            } else {

                complete.push(false);

            }

        });

        //console.log('Complete array: ', complete);

        this.surveyComplete = complete.indexOf(false) == -1;
        //console.log('Is the survey completed?', this.surveyComplete);
        //this.changeRef.detectChanges(); //this is necessary to fix issue with change ref..

        if (this.surveyComplete && this.surveySubmitted) {
            //console.log('The survey is complete. Lets update the account', this.assessmentData);
             this.assessmentData.steps[5] = true;

            this.assessmentService.updateAssessment(this.assessmentData).subscribe((res) => {

                this.assessmentData = res.assessment;

            })


        }

    }

    public updateSurvey(ev, id, value) {

        this.surveyComplete = true;

        let itemExists = false;

        this.assessmentData.survey.map((item, index) => {

            if (item.id == id) {
                itemExists = true;
                item.answer = value;
            }
        });

        itemExists = false;
        if (id != 101) {
            this.checkComplete();
        }
    }

    getSurveyAnswer(id: number): string {
        return this.assessmentData.survey.find(s => s.id == id).answer || '';
    }

    public show() {
    
        this.checkComplete();
        this.lgModal.show();
        this.onShow.next(true);
    }

    public hide() {
        this.checkComplete();
        this.lgModal.hide();
        this.onHide.next(this.surveyComplete);
    }

    public completeSurvey() {
        this.surveySubmitted = true;
        this.hide();

    }

    ngAfterViewInit() {

        //console.log('AssessmentData for survey: ' , this.assessmentData);


    }

    public handler(type: string, $event: ModalDirective) {
        this.onHide.next(true);
    }


}
