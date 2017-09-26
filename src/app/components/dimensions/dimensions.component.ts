import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AssessmentService} from "../assessment/assessment.service";
import {Subscription} from 'rxjs/Subscription';
import {UserService} from "../user-service/user.service";
import {DimensionService} from "../dimension-service/dimension.service";
declare var System:any;
declare var $:any;

@Component({
    selector: 'c-dimension',
    templateUrl: './dimensions.component.html'
})


export class DimensionsComponent implements OnInit, OnDestroy {

    @Input() dimensionid: any;
    @Input() datamode: boolean;
    @Input() guidemode: boolean;

    private sub: Subscription;
    private dimension: any;
    private seriesdata: any;
    private categories: any;
    private assessmentData: any;
    private answers: any;
    private answerData: any;
    private subquestions: any;
    public data: any;
    public answerConfirmed: boolean;
    public sessionStorage = sessionStorage;
    public score;


    constructor(private route: ActivatedRoute,
                private userService: UserService,
                private assessmentService: AssessmentService,
                private router: Router,
    private dimensionService: DimensionService) {
        this.answerData = [];
        this.subquestions = this.assessmentService.subquestions;
        this.data = {};
        this.data.account = {};
        this.answerConfirmed = false;
        this.categories = [];
        this.router = router;
        this.score = 0;
        this.answerData.subs = [];
        this.answerData.stressLevel;
    }

    ngOnInit() {

        this.data.account = this.userService.userData || this.data.account;
        if(typeof this.data.account.dimensions === "undefined"){

            this.data.account.dimensions = this.dimensionService.dimensions;
        }
        //console.log('@@@@@SURVEY INIT!', this.data.account);
        this.userService.user$.subscribe((userData) => {

            this.data.account = userData;
            //console.log('ACCOUNT INFORMATION ADDED!', this.data.account);

        });

        this.answers = this.assessmentService.answers;
        //passing route param...
        this.sub = this.route.params.subscribe(params => {

            //console.log('Dimension Comp', this.userService.userData);
            let id = +this.dimensionid || +params['id']; // (+) converts string 'id' to a number
            this.dimension = this.assessmentService.getDimension(id);
            this.userService.user$.subscribe((user) => {
                this.assessmentData = user.assessment;
                this.buildData();
            });

            if (this.userService.userData) {
                this.assessmentData = this.userService.userData.assessment || [];
                this.buildData();
            }

        });

    }


    buildData() {

        //console.log('Building data.');

        this.answerData = this.assessmentService.getAnswerForQuestion(this.assessmentData, this.dimension.id)[0] || [];

           this.answerData.subs.map((o) => {

                this.score += o;

             });

        this.score =  this.answerData.subs[1];
        //this.score = Math.round( this.score * 1) / 1;


        this.answerConfirmed = (this.answerData.subs.length == this.subquestions.length) && this.answerData.subs.indexOf(null) == -1;
        this.seriesdata = this.assessmentService.getSubsForDimension(this.assessmentData, this.dimension.id)[0].subs || [];
        //console.log('THE SERIES DATA 1', this.seriesdata);

        //console.log('THE DIMENSION IS: ' , this.dimension.category);
        this.categories.push({id: this.dimension.id, category: this.dimension.category});


        let temp2 = [];
        //loop through sub questions and then get each map data to what they chose for each area.
        this.assessmentService.subquestions.map((x, i)=> {
            //console.log('Row:', i, x);
            let visible = i == 0;
            temp2.push({name: x.category, data: [this.assessmentData[this.dimension.id - 1].subs[i]], visible: true, color: x.color});

        });

        this.seriesdata = temp2;
        //console.log('$$$$$$$The series data is: ', this.seriesdata);

    }


    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    save() {

        //console.log('Saving Your Data!', this.data.account);
        //we need to add the assessment data to the account so it will get stored in use data;
        this.userService.updateAccount(this.data.account).subscribe((res) => {
            //console.log('The result of the update is: ', this.data.account.assessment);
            this.buildData();
            this.answerConfirmed = true;
            var dataCheckPassed = [];


            //check if step 1 is complete.
            let duplicateObject = <any[]> JSON.parse(JSON.stringify(this.assessmentData));
            duplicateObject.forEach((x) => {

                if (x.subs.length == 0) {
                    x.subs = [null, null, null, null, null, null]
                }//fix to ensure subs is pre-populated. 0 means no selection.
                //console.log(x.answer, x.subs);
                //if they have left an answer blank or a sub is not answered, datacheck has not passed.
                if (x.answer <= 3 && x.subs.indexOf(null) > -1) {

                    //data check did not pass we need to update step as such...
                    console.log('Data Check Failed...');
                    dataCheckPassed.push(false);

                }else if(x.answer <= 3 && x.subs.indexOf(null) === -1){

                    console.log('Data Check Passed...');
                    dataCheckPassed.push(true);

                }

                //console.log(dataCheckPassed);




            });

            //if all the data passed for step 1, update the database as such..
            if(dataCheckPassed.indexOf(false) === -1){
                this.data.account.steps[1] = true;
                this.userService.updateAccount(this.data.account).subscribe((res) => {

                    sessionStorage.setItem('steps', this.data.account.steps);
                });

            }



        }, (err) => console.log('There was an error!'));


    }

    checkScroll() {

        let self = this;

        setTimeout(function () {


            //if (self.answerData.subs.length == self.subquestions.length) {

            $('body').animate({scrollTop: $('body').scrollTop() + 50});
            //}

        }, 1);

    }

    goToDashboard() {

        this.router.navigate(['/dashboard']);

    }

    checkReveal() {

        if((this.answerData.subs.length == this.subquestions.length && this.answerData.subs.indexOf(null) < 0) || (this.answerData.subs.length > 0 && this.answerData.subs.indexOf(null) < 0)){

            return true;
        }

    }

    goToDimension(id){

        this.router.navigate(['/dimensions', id]);

    }

    goToStress(){

        this.router.navigate(['/stress']);

    }







}

