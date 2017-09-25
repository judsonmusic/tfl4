import { SurveyService } from './../a-survey/survey.service';
import { Component, ViewChild, AfterViewInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
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

    @ViewChild('lgModal') public lgModal: ModalDirective;
    @Output() public onShow:EventEmitter<any> = new EventEmitter();
    @Output() public onShown:EventEmitter<any> = new EventEmitter();
    @Output() public onHide:EventEmitter<any> = new EventEmitter();
    @Output() public onHidden:EventEmitter<any> = new EventEmitter();

    public survey_questions;
    public survey_answers;
    public userData;
    public surveyComplete: boolean;
    public surveySubmitted;

    constructor(public userService: UserService, public surveyService: SurveyService, private router: Router, public changeRef: ChangeDetectorRef) {


        this.userService = userService;
        this.surveyService = surveyService;
        this.survey_questions = surveyService.questions;
        this.survey_answers = surveyService.answers;
        this.userData = userService.userData;
        this.surveySubmitted = false;
        //this.surveyComplete = false;
        if (this.userData.survey.length <= 0) {
            this.userData.survey = this.surveyService.survey;
        }

        this.checkComplete();
    }

    checkComplete() {
        this.surveyComplete = false;
        let complete = [];
        this.userData.survey.map((item, index) => {
            //console.log(item, index);
            if ((item.id < 100 && item.answer != '') || item.id == 101) {

                complete.push(true);

            } else {

                complete.push(false);

            }

        });

        //console.log(complete, complete.length);
        //console.log(complete);
        this.surveyComplete = complete.indexOf(false) == -1;
        //this.changeRef.detectChanges(); //this is necessary to fix issue with change ref..

        if (this.surveyComplete && this.surveySubmitted) {
            //console.log('The survey is complete. Lets update the account', this.userData);
            this.userData.steps[5] = true;
            this.userService.updateAccount(this.userData).subscribe((user) => {
                this.surveyService.surveyComplete = true;
                sessionStorage.setItem('steps', this.userData.steps);
                //console.log('Account updated with survey data!', user);

            })
        }
    }

    public updateSurvey(ev, id, value) {

        this.surveyComplete = true;

        let itemExists = false;

        this.userData.survey.map((item, index) => {
            
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
        return this.userData.survey.find(s => s.id == id).answer || '';
    }

    public show(){
        this.lgModal.show();    
        this.onShow.next(true);
      }
    
    public hide(){
        this.checkComplete();
        this.lgModal.hide();
        this.onHide.next(this.surveyComplete);
    }    

    public completeSurvey() {        
        this.surveySubmitted = true;
        this.hide();

    }

    ngAfterViewInit(){
        //this.checkComplete();
    }

    public handler(type: string, $event: ModalDirective) {
        this.onHide.next(true);
      }


}
