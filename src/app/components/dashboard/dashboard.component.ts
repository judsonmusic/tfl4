import { SurveyService } from './../a-survey/survey.service';
import { ModalYourResultsComponent } from './../modals/modalYourResultsComponent';
import { ModalDataJunkieComponent } from './../modals/modalDataJunkieComponent';
import { ModalGenericComponent } from './../modals/modalGenericComponent';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    @ViewChild('g4') public g4: ModalGenericComponent;
    @ViewChild('j') public j: ModalDataJunkieComponent;
    @ViewChild('r') public r: ModalYourResultsComponent;



    public areas: any;
    public assessmentData;
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
    public assessmentDataLoaded: boolean = false;
    public adminMode: boolean = false;
    public idealBeingScore;

    constructor(public route: ActivatedRoute, public router: Router, public assessmentService: AssessmentService, public userService: UserService, public ss: SurveyService) {
        this.adminMode = sessionStorage.getItem('adminMode') === "true";
        this.router = router;
        this.assessmentService = assessmentService;
        this.areas = this.assessmentService.questions;  
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
        this.assessmentDataLoaded = false;    
        
        if(!sessionStorage.getItem('surveyReminderShown')) sessionStorage.setItem('surveyReminderShown', "0")

    }



    ngOnInit() {
        console.log( 'USER ID: ', this.route.snapshot.params['user_id'], 'ASSESSMENT_ID', this.route.snapshot.params['assessment_id'])
        if(!this.route.snapshot.params['assessment_id'] && !this.route.snapshot.params['user_id']){
            alert('Proper params not defined. Redirecting.');
            this.router.navigate(['/assessment']);
        }
        
        //console.log('Dashboard init...');
        //we added this to make sure we have data on page reload!
        //for admin portal, we need to get the user information by passing in the user id via params...
        this.userService.getUserById(this.route.snapshot.params['user_id']).subscribe((user) => {
            //console.log('user data retrieved...');
            this.userData = user;
            
            this.assessmentService.getByUserId(this.userData._id, this.route.snapshot.params['assessment_id'] ).subscribe(res => {
                //console.log('The result from getting the assessment is: ', res.length, res);
                this.assessmentData = res[0]; //stores all of the assessment data.   
                
                if(!this.assessmentData.survey || this.assessmentData.survey.length == 0){
                    this.assessmentData.survey = this.ss.survey;
                    this.assessmentData.steps[5] = null;
                    sessionStorage.setItem('steps', this.assessmentData.steps);
                    //console.log('!!!! we had to default the survey data!')
                }                      

                let temp = [];
                this.assessmentService.questions.map((x) => {

                    temp.push({ id: x.id, category: x.category });

                });

                this.checkAssessmentComplete();
                this.categories = temp;
                this.checkAllUnlocked();
                this.checkComplete();
                this.buildSeries();
                this.getOverAllScore();
                this.getOverAllStressScore();

            });
        });


    }


    ngAfterViewInit() {
       
        this.showMotivated = false;

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

        this.assessmentData.assessment.map((obj) => {
            if (!isNaN(obj.answer)) {
                temp.push(obj.answer * 20);
            }

        });
        var sum = parseInt(temp.reduce((pv, cv) => pv + cv, 0).toString());
        var avg = Math.floor(((sum / temp.length) + 1) / 10) * 10;
        this.overAllScore = avg;
        this.idealBeingScore = avg;
        console.log('Overall being score: ', this.idealBeingScore);    
        
    }

    getOverAllStressScore() {

        var temp = [];

        this.assessmentData.dimensions.map((obj) => {

            if (!isNaN(obj.stressLevel)) {
                temp.push(obj.stressLevel);
            }

        });
        //console.log(temp);
        var sum = parseInt(temp.reduce((pv, cv) => pv + cv, 0).toString());
        var avg = Math.floor(((sum / temp.length) + 1) / 10) * 10;
        this.overAllStressScore = avg;
    }

    checkAssessmentComplete(){


        var temp = [];
     

        this.assessmentData.assessment.map((obj) => {
         
            temp.push(obj.answer != "");

        });

        //console.log('First 15 questions: ', temp);

        if(temp.indexOf(false) > -1){
            //this.g4.show();
            alert('This assessment was not completed. Redirecting.')
            this.router.navigate(['/assessment']);

        }


        //this.allUnlocked = temp.indexOf(false) === -1;
        //this.assessmentData.steps[6] = this.allUnlocked;


    }

    checkAllUnlocked() {

        var temp = [];
     

        this.assessmentData.assessment.map((obj) => {
         
            temp.push(obj.subs.indexOf(null) === -1);

        });

        //console.log(temp);


        this.allUnlocked = temp.indexOf(false) === -1;
        this.assessmentData.steps[6] = this.allUnlocked;


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
        this.assessmentData.steps[0] = null;
        this.assessmentData.steps[x] = true;
        sessionStorage.setItem('steps', this.assessmentData.steps.toString());
        this.updateAssessment();

    }


    //TODO: we need to update the assessment, not the account.
    public updateAssessment() {

        this.assessmentService.updateAssessment(this.assessmentData).subscribe((res) => {

            //this.assessmentData = res.assessment;       

        })

    }

    public checkComplete() {

        let complete = [];
       
            this.assessmentData.survey.map((item, index) => {

                //console.log(item);

                if (item.id != 101 && item.id != 100 && item.answer == "") {

                    complete.push(false);

                } else {

                    complete.push(true);

                }


            });//end map....

            //console.log('SURVEY: ' , complete);

            this.surveyComplete = complete.indexOf(false) == -1;

            //console.log('After Check!', this.surveyComplete);
        

        if (this.surveyComplete) {

            this.assessmentData.steps[5] = true;
            sessionStorage.setItem("surveyReminderShown", "3");
            //console.log('The survey is complete. Lets update the account', this.userService.userData);

            this.updateAssessment();
        } else{

            this.assessmentData.steps[5] = false;
            this.updateAssessment();
        }

        if (!this.surveyComplete && this.getCurrentStep() > 2) {
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
        //this.assessmentData.steps[1] = true;//why am I doing this?
        this.updateAssessment();
        //console.log('TEMP 2 is: ', temp2);

        /*
         This is the original way...
         //for each of the items in assessment data...
         this.assessmentData.assessment.map((x) =>{

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
        let duplicateObject = <any[]>JSON.parse(JSON.stringify(this.assessmentData.assessment));
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
        this.assessmentData.assessment.map((x) => {
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
            this.assessmentData.steps[1] = true;
            sessionStorage.setItem('steps', this.assessmentData.steps);
            this.updateAssessment();


        }


    }

    goToDimension(id) {
        if (!this.surveyComplete && this.getCurrentStep() > 2 && parseInt(sessionStorage.getItem('surveyReminderShown')) < 3) {
            this.g.onHide.subscribe((hidden) => {
                this.router.navigate(['/dimensions/'+this.route.snapshot.params['assessment_id']+'/'+id]);
            });
            this.g.show();
        } else {
            this.router.navigate(['/dimensions/'+this.route.snapshot.params['assessment_id']+'/'+id]);

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

            sessionStorage.setItem('steps', this.assessmentData.steps)
        }
        return sessionStorage.getItem('steps').split(",").map((item) => {
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

    showResults() {

        this.showGraph = true;
        this.showMotivated = true;
        //console.log(this.surveyComplete, parseInt(sessionStorage.getItem('surveyReminderShown')));

        if (!this.surveyComplete && parseInt(sessionStorage.getItem('surveyReminderShown')) < 3) { 
            //console.log('We need to show the survey reminder...')
            this.g.onHide.subscribe((hidden) => {
                sessionStorage.setItem("surveyReminderShown", (parseInt(sessionStorage.getItem("surveyReminderShown")) + 1).toString());
                this.r.show();
               
            });

            this.g.show();

    

        } else {
            //console.log('We DON\'T need to show the survey reminder...')
            this.r.show();

        }

    }

    showDataJunkie() {
       
        //console.log(parseInt(sessionStorage.getItem('surveyReminderShown')));
        if (!this.surveyComplete && parseInt(sessionStorage.getItem('surveyReminderShown')) < 3) { 
            //console.log('Need to show survey...')
            

            this.g2.onHide.subscribe((hidden) => {

                sessionStorage.setItem("surveyReminderShown", (parseInt(sessionStorage.getItem("surveyReminderShown")) + 1).toString());
                this.router.navigate(['data-junkie/'+this.route.snapshot.params['assessment_id']]);
            });

            this.g2.show();

            
        } else {
            this.g2.hide();
            this.router.navigate(['data-junkie/'+this.route.snapshot.params['assessment_id']]);

        }

    }

    showTFLGuide() {
        if (!this.surveyComplete && parseInt(sessionStorage.getItem('surveyReminderShown')) < 3) { 
            this.g3.onHide.subscribe((hidden) => {

                sessionStorage.setItem("surveyReminderShown", (parseInt(sessionStorage.getItem("surveyReminderShown")) + 1).toString());
                this.router.navigate(['tfl-guide/'+this.route.snapshot.params['assessment_id']]);
            });
            this.g3.show();
        } else {
            this.router.navigate(['tfl-guide/'+this.route.snapshot.params['assessment_id']]);

        }



    }

    takeSurvey() {

        this.s.onHide.subscribe((complete) => {
            if (complete) {
                this.surveyComplete = true;
                this.assessmentData.steps[5] = true;
            }

        });       
        this.s.show();
    }


}
