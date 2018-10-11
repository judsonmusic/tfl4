import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from "../assessment/assessment.service";
import { Subscription } from 'rxjs/Subscription';
import { UserService } from "../user-service/user.service";
import { DimensionService } from "../dimension-service/dimension.service";
import { DomSanitizer } from '@angular/platform-browser';
declare var System: any;
declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'c-dimension',
    templateUrl: './dimensions.component.html'
})


export class DimensionsComponent implements OnInit, OnDestroy {

    @Input() dimensionid: any;
    @Input() datamode: boolean;
    @Input() guidemode: boolean;
    @Input() assessmentData: any;

    public sub: Subscription;
    public dimension: any;
    public seriesdata: any;
    public categories: any;
    public answers: any;
    public answerData: any;
    public subquestions: any;
    public data: any;
    public answerConfirmed: boolean;
    public sessionStorage = sessionStorage;
    public score;
    public dataBuilt;

    constructor(private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private userService: UserService,
        private assessmentService: AssessmentService,
        private router: Router,
        private dimensionService: DimensionService) {

        this.dataBuilt = false;
        this.answerData = [];
        this.subquestions = this.assessmentService.subquestions;
        this.answerConfirmed = false;
        this.categories = [];
        this.router = router;
        this.score = 0;
        this.answerData.subs = [];
        this.answerData.stressLevel;
    }

    ngOnInit() {

        if(!this.route.snapshot.params['assessment_id']){
            //this.router.navigate(['/assessment']);
        }

        if(!this.route.snapshot.params['dimension_id']){
            //this.router.navigate(['/assessment']);
        }

        let doStuff = () => {
            //console.log('Setting everything up...')
            let temp = [];
            this.assessmentService.questions.map((x) => {

                temp.push({ id: x.id, category: x.category });

            });


            //old stuff brought into this function...
            if (typeof this.assessmentData.dimensions === "undefined") {

                this.assessmentData.dimensions = this.dimensionService.dimensions;
            }

            this.answers = this.assessmentService.answers;
            //passing route param...
            this.route.snapshot.params['dimension_id']
            let id = +this.dimensionid || +this.route.snapshot.params['dimension_id']; // (+) converts string 'id' to a number
            this.dimension = this.assessmentService.getDimension(id);
            this.dimension.trustedTemplate = this.sanitizer.bypassSecurityTrustHtml(this.dimension.template);

            this.buildData();
            /* this.sub = this.route.params.subscribe(params => {

                //console.log('Dimension Comp', this.userService.userData);
                let id = +this.dimensionid || +params['id']; // (+) converts string 'id' to a number
                this.dimension = this.assessmentService.getDimension(id);
                this.dimension.trustedTemplate = this.sanitizer.bypassSecurityTrustHtml(this.dimension.template);

                this.buildData();

            }); */

        }

       //if data is not passed in, go get it...
        if (!this.assessmentData) {
            this.userService.getUser().subscribe((user) => {

                this.assessmentService.getByUserId(user._id, this.route.snapshot.params['assessment_id']).subscribe(res => {
                    //console.log('The result from getting the assessment is: ', res.length, res);
                    this.assessmentData = res[0]; //stores all of the assessment data.            

                    doStuff();

                });
            });
        } else {

            doStuff();
        }




    }


    buildData() {
        this.dataBuilt = false;
        //console.log('Building data.');

        this.answerData = this.assessmentService.getAnswerForQuestion(this.assessmentData.assessment, this.dimension.id)[0] || [];

        this.answerData.subs.map((o) => {

            this.score += o;

        });

        this.score = this.answerData.subs[1];
        //this.score = Math.round( this.score * 1) / 1;


        this.answerConfirmed = (this.answerData.subs.length == this.subquestions.length) && this.answerData.subs.indexOf(null) == -1;
        this.seriesdata = this.assessmentService.getSubsForDimension(this.assessmentData.assessment, this.dimension.id)[0].subs || [];
        //console.log('THE SERIES DATA 1', this.seriesdata);

        //console.log('THE DIMENSION IS: ' , this.dimension.category);
        this.categories.push({ id: this.dimension.id, category: this.dimension.category });


        let temp2 = [];
        //loop through sub questions and then get each map data to what they chose for each area.
        this.assessmentService.subquestions.map((x, i) => {
            //console.log('Row:', i, x);
            let visible = i == 0;
            temp2.push({ name: x.category, data: [this.assessmentData.assessment[this.dimension.id - 1].subs[i]], visible: true, color: x.color });

        });

        this.seriesdata = temp2;
        //console.log('$$$$$$$The series data is: ', this.seriesdata);
        this.dataBuilt = true;

    }


    ngOnDestroy() {
        //this.sub.unsubscribe();
    }

    save() {

        //console.log('Saving your data...');
        this.assessmentService.updateAssessment(this.assessmentData).subscribe((res)=>{

            this.assessmentData = res.assessment;

            //console.log('The result of the update is: ', this.data.account.assessment);
            this.buildData();
            this.answerConfirmed = true;
            var dataCheckPassed = [];


            //check if step 1 is complete.
            let duplicateObject = <any[]>JSON.parse(JSON.stringify(this.assessmentData.assessment));
            duplicateObject.forEach((x) => {

                if (x.subs.length == 0) {
                    x.subs = [null, null, null, null, null, null]
                }//fix to ensure subs is pre-populated. 0 means no selection.
                //console.log(x.answer, x.subs);
                //if they have left an answer blank or a sub is not answered, datacheck has not passed.
                if (x.answer <= 3 && x.subs.indexOf(null) > -1) {

                    //data check did not pass we need to update step as such...
                    //console.log('Data Check Failed...');
                    dataCheckPassed.push(false);

                } else if (x.answer <= 3 && x.subs.indexOf(null) === -1) {

                    //console.log('Data Check Passed...');
                    dataCheckPassed.push(true);

                }
            });

            //if all the data passed for step 1, update the database as such..
            if (dataCheckPassed.indexOf(false) === -1) {
                this.assessmentData.steps[1] = true;
                //TODO: udpate assessment...
                this.assessmentService.updateAssessment(this.assessmentData).subscribe((res) => {

                    sessionStorage.setItem('steps', this.assessmentData.steps);
                }); 

            }


        })
        
            
        
        
    }

    checkScroll() {

        let self = this;

        setTimeout(function () {
            $('body').animate({ scrollTop: $('body').scrollTop() + 50 });

        }, 1);

    }

    goToDashboard() {
       

            if(this.route.snapshot.params['assessment_id']){
                this.router.navigate(['/dashboard/'+this.route.snapshot.children[0].params['user_id'] + "/" +this.route.snapshot.children[0].params['assessment_id']])
            }
    
       
        

    }

    checkReveal() {

        if ((this.answerData.subs.length == this.subquestions.length && this.answerData.subs.indexOf(null) < 0) || (this.answerData.subs.length > 0 && this.answerData.subs.indexOf(null) < 0)) {

            return true;
        }

    }

    goToDimension(id) {

        this.router.navigate(['/dimensions/'+this.route.snapshot.params['assessment_id']+'/'+id]);

    }

    goToStress() {

        this.router.navigate(['/stress']);

    }



    printPage() {
        var self = this;

        if (window.matchMedia) {
            var mediaQueryList = window.matchMedia('print');
            mediaQueryList.addListener(function (mql) {
                if (mql.matches) {
                    //beforePrint();
                    //console.log('Before Print...');
                } else {
                    //console.log('After Print...')
                    self.closeAllPanels();
                }
            });
        } else {

            window.onafterprint = function () {
                //console.log("*******Printing completed...");
                self.closeAllPanels();
            }
        }

        this.openAllPanels().then(() => {

            //console.log('Promise resolved!');
            window.print();

        })

    }

    openAllPanels() {

        return new Promise((resolve, reject) => {

            jQuery('.dimension .panel').find('.panel-body').show(1, () => {
                resolve("Success!"); // Yay! Everything went well!
            });

        });


    }

    closeAllPanels() {

        return new Promise(() => {

            jQuery('.dimension .panel').find('.panel-body').hide(1, () => {

                jQuery('.dimension .panel.default-show').find('.panel-body').show();

            });


        });


    }
}

