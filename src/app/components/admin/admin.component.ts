import {Component, OnInit} from '@angular/core';
import {AdminService} from "./admin.service";
import {AssessmentService} from "../assessment/assessment.service";
import {SurveyService} from "../survey/survey.service";
import {Router} from "@angular/router";
declare var System:any;
@Component({
    selector: 'admin-dashboard',
    templateUrl: './admin.component.tpl.html'
})
export class AdminComponent implements OnInit {


    public users: any[];
    public user: any[];

    constructor(private adminService: AdminService, private assessmentService: AssessmentService, private surveyService: SurveyService, public router: Router) {

        this.adminService = adminService;
        this.assessmentService = assessmentService;
        this.surveyService = surveyService;
        this.router = router;

        this.adminService.getUser().subscribe((user)=> {

            if (user['admin']) {

                console.log(user['admin']);
                this.adminService.getUsers().subscribe((users)=> {


                    this.users = users;

                });

            }else{

                //this.router.navigate(['/dashboard'])
            }

        })


    }

    ngOnInit() {


    }

    viewUser(user) {



        //loop through assessment
        user['assessment'].map((obj)=>{

            console.log(obj);

            obj.questionValue = (this.assessmentService.questions.filter((item:any) => item.id === obj.id)[0].question);
            obj.answerValue = (this.assessmentService.answers.filter((item:any) => item.id === obj.answer)[0].value);

        });


        //loop through the survey..
        user['survey'].map((obj)=>{

            //obj.questionValue = (this.surveyService.questions.filter((item: any) => item.id === obj.id)[0].question);

            //if its less than 100, set the answer value to the answer given.
            if(obj.id < 100) {
                if(obj.answer) {

                    obj.answerValue = (this.surveyService.answers.filter((item: any) => item.id === obj.answer)[0].value);

                }else{

                    obj.answerValue = 'No answer Provided.';
                }

            }else{

                obj.answerValue = obj.answer;
            }



        });

        this.user = user;
        //now that we have a user, we need to match the values to the assessment values for data.

    }



}
