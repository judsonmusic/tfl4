import { ModalYourResultsComponent } from './../modals/modalYourResultsComponent';
import { ModalDataJunkieComponent } from './../modals/modalDataJunkieComponent';
import { ModalGenericComponent } from './../modals/modalGenericComponent';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentService } from "../assessment/assessment.service";
import { UserService } from "../user-service/user.service";
declare var System: any;


@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    @ViewChild('tooltip') tooltip;
    @ViewChild('tooltip2') tooltip2;
    @ViewChild('s') public s: ModalDirective;
    @ViewChild('g') public g: ModalGenericComponent;
    @ViewChild('g2') public g2: ModalGenericComponent;
    @ViewChild('g3') public g3: ModalGenericComponent;
    @ViewChild('j') public j: ModalDataJunkieComponent;
    @ViewChild('r') public r: ModalYourResultsComponent;
    


    public areas: any;
    public assessmentData: any[];
    public categories: any;
    public seriesdata: any;
    public dataCheckPassed: boolean;
    public motivatedAreas: any;
    public motivatedAreas2: any;
    public motivatedAreasNon: any;
    public allGood: any;
    public notGood: any;
    public NONmotivatedAreas: any;
    public userData: any;
    public allUnlocked: boolean;
    public surveyComplete = false;
    public overAllScore;
    public overAllStressScore;
    public showMotivated: boolean = false;
    public showGraph: boolean = false;

    constructor(public router: Router, public assessmentService: AssessmentService, public userService: UserService) {

        this.router = router;
        this.assessmentService = assessmentService;
        this.areas = this.assessmentService.questions;
        this.assessmentData = [];
        this.userService = userService;
        this.dataCheckPassed = false;
        this.motivatedAreas = [];
        this.motivatedAreas2 = [];
        this.motivatedAreasNon = [];
        this.allGood = [];
        this.notGood = [];
        this.NONmotivatedAreas = [];
        this.seriesdata = [];
        this.userService = userService;
        this.allUnlocked = false;


    }



    ngOnInit() {

        //we added this to make sure we have data on page reload!
        this.userService.getUser().subscribe((user) => {
            //console.log('user data retrieved...');
            this.userData = user;
            this.assessmentData = this.userData.assessment;
            let temp = [];
            this.assessmentService.questions.map((x) => {

                temp.push({ id: x.id, category: x.category });

            });
            this.categories = temp;
            this.checkAllUnlocked();
            this.checkComplete();
            this.buildSeries();
            this.getOverAllScore();
            this.getOverAllStressScore();


        });


    }


    ngAfterViewInit() {

        if (typeof this.tooltip !== "undefined") {
            //this.tooltip.show();
        }
        if (typeof this.tooltip2 !== "undefined") {
            //this.tooltip2.show();
        }          
      
        // Another way to set attribute value to element
        // this.renderer.setElementAttribute(this.player, 'src', this.src);
    }

    getOverAllScore() {

        var temp = [];

        this.userData.assessment.map((obj) => {
            if (!isNaN(obj.answer)) {
                temp.push(obj.answer * 20);
            }

        });
        var sum = parseInt(temp.reduce((pv, cv) => pv + cv, 0).toString());
        var avg = Math.floor(((sum / temp.length) + 1) / 10) * 10;
        this.overAllScore = avg;
    }

    getOverAllStressScore() {

        var temp = [];

        this.userData.dimensions.map((obj) => {

            if (!isNaN(obj.stressLevel)) {
                temp.push(obj.stressLevel);
            }

        });
        //console.log(temp);
        var sum = parseInt(temp.reduce((pv, cv) => pv + cv, 0).toString());
        var avg = Math.floor(((sum / temp.length) + 1) / 10) * 10;
        this.overAllStressScore = avg;
    }

    checkAllUnlocked() {

        var temp = [];

        this.userData.assessment.map((obj) => {

            temp.push(obj.subs.indexOf(null) === -1);

        });


        this.allUnlocked = temp.indexOf(false) === -1;
        this.userData.steps[6] = this.allUnlocked;


    }

    public updateStep(x) {

        //console.log('Update Steps', x);

        switch (x) {
            case 2:
                this.resultsIsOpen(true);
                break;
            case 3:
                this.djIsOpen(true);
                break;
            case 4:
                this.tflGuideIsOpen(true);
                break;

        }
        this.userData.steps[0] = null;
        this.userData.steps[x] = true;
        sessionStorage.setItem('steps', this.userData.steps.toString());
        this.updateUser();

    }

    public updateUser() {

        this.userService.updateAccount(this.userData).subscribe((user) => {

            this.userData = user;

        })

    }

    public checkComplete(surveyComplete?) {

        let complete = [];
        if (!surveyComplete && this.userData.survey.length === 0) {
            this.surveyComplete = false;
        } else {
            this.userData.survey.map((item, index) => {

                //console.log(item);

                if (item.id != 101 && item.id != 100 && item.answer == "") {

                    complete.push(false);

                } else {

                    complete.push(true);

                }


            });

            //console.log('SURVEY: ' , complete);

            this.surveyComplete = complete.indexOf(false) == -1;
        }

        if (this.surveyComplete) {

            this.userData.steps[5] = true;
            //console.log('The survey is complete. Lets update the account', this.userService.userData);

            this.updateUser();
        } else {

            //alert('You havent compelted the survey!');
            //this.s.show();
            
        }

        if(!this.surveyComplete && this.getCurrentStep() > 2){
            //this.g.show();
        }
    }



    buildSeries() {

        //console.log('Bulding series...');

        //console.log('Build Series');
        //temp 2 represents the 6 sub questions. for building the chart, we iterate through these on each dimension.
        let temp2 = [];
        //the ones that are visible on the chart.
        let visibleItems = [1, 5];
        //for 5 subquestions...
        this.assessmentService.subquestions.map((x, i) => {
            //this determined which items we want visible on the chart based on the array above. 1,5 is satisfaction and motivation.
            let visible = visibleItems.indexOf(i) > -1;
            temp2.push({ name: x.category, data: [], visible: visible, color: x.color });

        });

        //console.log(temp2);

        this.dataCheckPassed = true;
        //this.userData.steps[1] = true;//why am I doing this?
        this.updateUser();
        //console.log('TEMP 2 is: ', temp2);

        /*
         This is the original way...
         //for each of the items in assessment data...
         this.assessmentData.map((x) =>{

         if(x.subs.length == 0){ x.subs = [0,0,0,0,0,0]}//fix to ensure subs is pre-populated. 0 means no selection.

         //if they have left and answer blank or a sub is not answered, datacheck has not passed.
         if(x.answer == "" || x.subs.indexOf(null) > -1){

         this.dataCheckPassed = false;

         }else {

         //for each area on the series, we need to set what they selected from each area. 5 total. For example spiriitual.
         temp2.map((z, index)=> {
         //in each of the 5 things, get the values by index.
         //console.log('The data we are pushing to seriesData:', z);
         z.data.push(x.subs[index]);

         });

         }

         });
         */

        //for each of the items in assessment data...
        //can we make this a temp array just for the charts?
        let duplicateObject = <any[]>JSON.parse(JSON.stringify(this.assessmentData));
        duplicateObject.forEach((x) => {

            if (x.subs.length == 0) {
                x.subs = [null, null, null, null, null, null]
            }//fix to ensure subs is pre-populated. 0 means no selection.

            //if they have left and answer blank or a sub is not answered, datacheck has not passed.
            if (x.answer <= 3 && x.subs.indexOf(null) > -1) {

                this.dataCheckPassed = false;

            } else {

                //here is where we can determined what we actually want to show on the chart. We need to set subs to [0,0,0,0,0,0] if they are satisfied and not motivated.
                //if satisfaction greater than neutral and motivation
                if (x.answer > 3 || x.subs[5] < 80 && x.subs.indexOf(null) === -1) {
                    //todo: attempted to only show where they are not satisfied or arent motivated to change right now. its affecting the data on the view as well. The lock icons become grey. This is changing the data in the database :(
                    x.subs = [0, 0, 0, 0, 0, 0]; //TODO: this is changing the actual aseesment data :( need to change because its in a map function.//they are satisfied and not motivated to change.
                }

                //for each area on the series, we need to set what they selected from each area. 5 total. For example spiriitual.
                temp2.map((z, index) => {
                    //in each of the 5 things, get the values by index.
                    //console.log('The data we are pushing to seriesData:', z);
                    z.data.push(x.subs[index]);

                });

            }



        });

        //console.log(temp2);
        this.seriesdata = temp2;

        //algorythms
        //1. dont need help
        //2. do need help.

        //AREAS THAT DO NOT NEED ATTENTION
        this.assessmentData.map((x) => {
            //the answer is greater than 3 and subs are null
            if (x.answer > 3) {
                //this needs to be determined also by sub data. check to see if they have already answered and are not satisfied but motivated to take action.
                if (x.subs.indexOf(null) === -1 && x.subs[1] < 80 && x.subs[5] > 60) {
                    //after the fact...
                    this.notGood.push(x);
                } else {
                    this.allGood.push(x);
                }

            } else {

                this.notGood.push(x);
            }

        });

        //console.log('ALL GOOD:', this.allGood);
        //console.log('NOT GOOD:', this.notGood);

        //now, out of the ones that are not good, lets see where they are motivated to change.
        this.allGood.map((x) => {
            //if you are not satisfied but motivated
            //console.log('Satisfied:', x.subs[1], 'Motivated', x.subs[5]);
            if (x.subs[1] < 80 && x.subs[5] > 60) {
                if (x.subs.indexOf(null) === -1 && x.subs.indexOf(null).length === 6)
                    this.motivatedAreas.push(x);
            } else {
                if (x.subs.indexOf(null) === -1 && x.subs.indexOf(null).length === 6)
                    this.NONmotivatedAreas.push(x);
            }
        });


        //now, out of the ones that are not good, lets see where they are motivated to change.
        this.notGood.map((x) => {
            //if you are not satisfied but motivated
            //console.log('Satisfied:', x.subs[1], 'Motivated', x.subs[5]);
            if (x.subs[1] < 80 && x.subs[5] > 60) {
                this.motivatedAreas.push(x)

            } else {
                this.NONmotivatedAreas.push(x);
            }
        });

        //console.log('BAD AREAS:', this.notGood);
        //console.log('NON MOTIVATED AREAS:', this.NONmotivatedAreas);

        if (this.dataCheckPassed) {
            //they have completed everything...
            //console.log('The data check passed!');
            this.userData.steps[1] = true;
            sessionStorage.setItem('steps', this.userData.steps);
            this.updateUser();


        }


    }

    goToDimension(id) {
        if(!this.surveyComplete && this.getCurrentStep() > 2){
            this.g.onHide.subscribe((hidden) => {
                this.router.navigate(['/dimensions', id]);
              });
            this.g.show();
        }else{
            this.router.navigate(['/dimensions', id]);
            
        }

       

    }

    takeAction() {

        this.router.navigate(['/action']);

    }

    //step 2
    tflGuideIsOpen(x) {
        var steps = [1];
        if (x && this.checkStepsFromStorage(steps)) {
            sessionStorage.setItem('tflGuideIsOpen', '1')
        }
        //console.log('tfl guide is open', typeof sessionStorage.getItem('tflGuideIsOpen') === "object");
        return typeof sessionStorage.getItem('tflGuideIsOpen') === "object";
    }

    //step 3
    resultsIsOpen(x) {
        var steps = [1, 2];
        if (x && this.checkStepsFromStorage(steps)) {
            sessionStorage.setItem('resultsIsOpen', '1')
        }
        //console.log('result is open', typeof sessionStorage.getItem('resultsIsOpen') === "object");
        return typeof sessionStorage.getItem('resultsIsOpen') === "object";
    }

    //step 4
    djIsOpen(x) {
        var steps = [1, 2, 3];
        if (x && this.checkStepsFromStorage(steps)) {
            sessionStorage.setItem('djIsOpen', '1')
        }
        //console.log('dj is open', typeof sessionStorage.getItem('djIsOpen') === "object");
        return typeof sessionStorage.getItem('djIsOpen') === "object";
    }

    //this will get the steps that they have taken.
    getStepsFromStorage() {
        if (!sessionStorage.getItem('steps')) {

            sessionStorage.setItem('steps', this.userData.steps)
        }
        return sessionStorage.getItem('steps').split(",").map((item)=>{
            return item && item == "true" ? true : false
        })
    }

    //TODO: need to check this algorithm.
    checkStepsFromStorage(steps) {

        var checkPassed = true;

        //steps are passed in to see if they exist in storage or not.
        steps.map((item) => {

            if (!this.getStepsFromStorage()[item]) {
                checkPassed = false;
            }

        });
        //console.log('Check Passed ', checkPassed);

        return checkPassed;

    }

    getCurrentStep() {

        var tempSteps = [];

        this.getStepsFromStorage().map((step, index) => {

            if (index > 0) tempSteps.push(step || false);

        });

        //console.log('Temp Steps', tempSteps);

        return tempSteps.indexOf(false) + 1;

    }

    showResults(){

        this.showGraph = true;
        this.showMotivated = true;

        if(!this.surveyComplete){
           
            this.g.onHide.subscribe((hidden) => {
                this.r.show();
              });
              this.g.show();
           
        }else{
            this.r.show();
            
        }
        
    }

    showDataJunkie(){
        if(!this.surveyComplete){
            
            this.g2.onHide.subscribe((hidden) => {
                this.router.navigate(['data-junkie'])
              });
              this.g2.show();
           
        }else{
            this.router.navigate(['data-junkie'])
            
        }

    }

    showTFLGuide(){
        if(!this.surveyComplete){
            this.g3.onHide.subscribe((hidden) => {
                this.router.navigate(['tfl-guide'])
              });
            this.g3.show();
        }else{
            this.router.navigate(['tfl-guide'])
            
        }

                
        
    }

    takeSurvey(){

        this.s.onHide.subscribe((complete) => { 
            if(complete){
                this.surveyComplete = true;
                this.userData.steps[5] = true;
            }          
  
        });
        this.s.show();
    }


}
