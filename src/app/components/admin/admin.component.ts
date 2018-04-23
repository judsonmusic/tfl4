import { CompaniesService } from './../services/companies.service';
import { SurveyService } from './../a-survey/survey.service';
import { Component, OnInit } from '@angular/core';
import { AdminService } from "./admin.service";
import { AssessmentService } from "../assessment/assessment.service";
import { Router } from "@angular/router";
declare var System: any;
@Component({
    selector: 'admin-dashboard',
    templateUrl: './admin.component.tpl.html'
})
export class AdminComponent implements OnInit {


    public users: any[];
    public currentUser: any[];
    public companies;
    public userFilterParams;
    public filterCount: number = 0;

    constructor(private adminService: AdminService, private assessmentService: AssessmentService, private surveyService: SurveyService, public router: Router, public cs: CompaniesService) {

        this.adminService = adminService;
        this.assessmentService = assessmentService;
        this.surveyService = surveyService;
        this.router = router;
        this.userFilterParams = {};

        this.adminService.getUser().subscribe((user) => {

            //console.log(user);

            if (user['admin']) {

                //console.log(user['admin']);

                this.cs.getCompanies().subscribe((companies)=>{

                    //console.log('The companies: ' , companies);
                    this.companies = companies;
                })
                this.adminService.getUsers().subscribe((users) => {


                    this.users = users;
                    //console.log(this.users);

                });

            } else {

                //this.router.navigate(['/dashboard'])
            }

        })


    }

    ngOnInit() {


    }

    checkSurvey(survey) {
        return parseInt(survey[0].answer) > 0;
    }

    checkSteps(steps) {
        var count = 0;
        steps.map(item => {
            if (item > 0) count++
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
            if (obj.id < 100) {

                obj.questionValue = (this.surveyService.questions.filter((item: any) => item.id === obj.id)[0].question);

                if (obj.answer && obj.answer !== "on") {

                    obj.answerValue = (this.surveyService.answers.filter((item: any) => item.id === obj.answer)[0].value);

                } else {

                    obj.answerValue = 'No answer Provided.';// [' + obj.answer + ']';
                }

            } else {

                obj.answerValue = obj.answer;
            }



        });

        this.currentUser = user;
        //now that we have a user, we need to match the values to the assessment values for data.

    }

    deleteUser(user) {

        var result = window.confirm("Are you sure you want to delete this user?");
        if (result) {

            console.log(result);

            let index = this.users.indexOf(user);

            this.adminService.deleteUser(user).subscribe((res) => {
                this.users.splice(index, 1);
                console.log('Account Deleted!');
            })
        }
    }


    filterChange(){
    
        this.filterCount++;

    }

    clearSearch(){

        this.userFilterParams = {};
    }

    getDimension(id){

        return this.assessmentService.questions.filter(
          (item:any) => item.id === id)[0];
  
    }

    getMotivated(user, dimensionId){

        let motivated = false;
        //console.log(dimensionId, user.assessment);
        var subs = user.assessment.filter(item => item.id == dimensionId)[0].subs;
         if(subs[1] < 80 && subs[5] > 60){
            motivated = true;
        }
        //console.log('Motivated To Take Action? ' , subs, motivated);
        return motivated; 
    }



}
