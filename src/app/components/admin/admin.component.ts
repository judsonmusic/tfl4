import { Component, OnInit } from '@angular/core';
import { AdminService } from "./admin.service";
import { AssessmentService } from "../assessment/assessment.service";
import { SurveyService } from "../survey/survey.service";
import { Router } from "@angular/router";
declare var System: any;
@Component({
    selector: 'admin-dashboard',
    templateUrl: './admin.component.tpl.html'
})
export class AdminComponent implements OnInit {


    public users: any[];
    public currentUser: any[];

    constructor(private adminService: AdminService, private assessmentService: AssessmentService, private surveyService: SurveyService, public router: Router) {

        this.adminService = adminService;
        this.assessmentService = assessmentService;
        this.surveyService = surveyService;
        this.router = router;

        this.adminService.getUser().subscribe((user) => {

            if (user['admin']) {

                console.log(user['admin']);
                this.adminService.getUsers().subscribe((users) => {


                    this.users = users;
                    console.log(this.users);

                });

            } else {

                //this.router.navigate(['/dashboard'])
            }

        })


    }

    ngOnInit() {


    }

    checkSurvey(survey){
        return parseInt(survey[0].answer) > 0; 
    }

    checkSteps(steps){
        var count = 0;
        steps.map(item=>{
           if(item > 0) count++
        })
        return count;       

    }

    viewUser(user) {

        //loop through assessment
        user['assessment'].map((obj) => {

            if (obj.id) {
                obj.questionValue = (this.assessmentService.questions.filter((item: any) => item.id === obj.id)[0].question);
            } else {
                obj.questionValue = '???'
            }
            if (obj.answer) {
                obj.answerValue = (this.assessmentService.answers.filter((item: any) => item.id === obj.answer)[0].value);
            } else {
                obj.answerValue = '???'

            }

        });


        //loop through the survey..
        user['survey'].map((obj) => {   
 
             //if its less than 100, set the answer value to the answer given.
             if(obj.id < 100) {

                 obj.questionValue = (this.surveyService.questions.filter((item: any) => item.id === obj.id)[0].question);

                 if(obj.answer && obj.answer !== "on") {
 
                     obj.answerValue = (this.surveyService.answers.filter((item: any) => item.id === obj.answer)[0].value);
 
                 }else{
 
                     obj.answerValue = 'No answer Provided.';// [' + obj.answer + ']';
                 }
 
             }else{
 
                 obj.answerValue = obj.answer;
             }



        });

        this.currentUser = user;
        //now that we have a user, we need to match the values to the assessment values for data.

    }



}
