import { SurveyService } from './../a-survey/survey.service';
import { Component, ViewChild, AfterViewInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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

    @ViewChild('childModal') public childModal: ModalDirective;
    @ViewChild('lgModal') public lgModal: ModalDirective;

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


    }

    checkComplete() {
        this.surveyComplete = false;
        console.log('Checking to see if survey is complete...')

        //really need to chane this to use angularl elementRef
        //$('.modal.in').animate({scrollTop: $('.modal.in').scrollTop() + 50});
        //$('.modal.open').animate({ scrollTop: $('.modal').height() }, 'fast');

        let complete = [];

        this.userData.survey.map((item, index) => {

            console.log(item, index);

            if ((item.id < 100 && item.answer != '') || item.id == 101) {

                complete.push(true);

            } else {

                complete.push(false);

            }

        });

        console.log(complete, complete.length);
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
                console.log(item, id)
                itemExists = true;
                item.answer = value;        
            }
        });

        console.log(this.userData.survey);

        itemExists = false;
        if (id != 101) {
            this.checkComplete();
        }
    }

    getSurveyAnswer(id: number): string {
        return this.userData.survey.find(s => s.id == id).answer || '';
    }

    public show() {
        this.lgModal.show();
        this.checkComplete();
    }

    public showChildModal(): void {
        this.childModal.show();
    }

    public hideChildModal(): void {
        this.childModal.hide();
    }

    ngAfterViewInit() {
        //REMOVED BECAUSE THIS DOESNT NEED TO HAPPEN UNTIL MODAL POPS.
        //this.checkComplete();

    }

    public completeSurvey() {
        
        this.surveySubmitted = true;
        this.checkComplete();
        this.lgModal.hide();
        //this.router.navigate(['tfl-guide']);
    }


}
