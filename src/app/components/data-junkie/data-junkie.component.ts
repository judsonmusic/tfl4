import { ModalDataJunkieComponent } from './../modals/modalDataJunkieComponent';
import{ Component , OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AssessmentService} from "../assessment/assessment.service";
import {UserService} from "../user-service/user.service";
import {SurveyService} from "../a-survey/survey.service";
declare var System:any;

@Component({
  selector: 'dataJunkie',
  templateUrl: 'data-junkie.component.html',
})
export class DataJunkieComponent implements OnInit, AfterViewInit{

  @ViewChild('j') public j: ModalDataJunkieComponent;

  public areas:any;
  public assessmentData;
  public categories: any;
  public userData: any;
  public dataCheckPassed: boolean;
  public seriesdata: any;
  public guidemode;
  public datamode;

  constructor(public route: ActivatedRoute, public router: Router, public assessmentService: AssessmentService, public userService: UserService, public surveyService: SurveyService) {

    this.router = router;
    this.assessmentService = assessmentService;
    this.areas = this.assessmentService.questions;
    this.userService = userService;
    this.userData = this.userService.userData || [];
    this.surveyService = surveyService;

    //re-direct if survey not complete.
   /*if(!this.surveyService.surveyComplete){

     this.router.navigate(['/dashboard']);

    }*/


  }
  public surveyComplete = false;

  public checkComplete(){

    let complete = [];

    this.assessmentData.survey.map((item, index)=> {

      if (item.id != 101 && item.id != 100 && item.answer == "") {

        complete.push(false);

      } else{

        complete.push(true);

      }


    });

    this.surveyComplete = complete.indexOf(false) == -1;

    if(this.surveyComplete){

      sessionStorage.setItem("surveyReminderShown", "3");

      this.assessmentService.updateAssessment(this.assessmentData).subscribe((user)=>{


      })
    }
  }

  ngOnInit() {  
   

    //TODO: get assessment data:
    //this.assessmentData = this.userService.userData.assessment || [];
    this.userService.getUser().subscribe((user) => {
      //console.log('user data retrieved...');
      this.userData = user;

      this.assessmentService.getByUserId(this.userData._id, this.route.snapshot.params['assessment_id'] ).subscribe(res => {
          console.log('The result from getting the assessment is: ', res.length, res);
          this.assessmentData = res[0]; //stores all of the assessment data.     
          //do everything else...

           let temp = [];
          this.assessmentService.questions.map((x)=> {
      
            temp.push({id: x.id, category: x.category});
      
          });
      
          this.categories = temp;    
          this.checkComplete();
          this.buildSeries(); 

      });
    });


   

  }

  ngAfterViewInit(){    
    this.j.show();
  }

  buildSeries(){

    //console.log('Build Series');
    let temp2 = [];
    //for 5 subquestions...
    this.assessmentService.subquestions.map((x, i)=> {
      //console.log('Row:', i, x);
      let visible = i == 0;
      temp2.push({name: x.category, data:[], visible: true, color: x.color});

    });

    this.dataCheckPassed = true;
    //console.log('TEMP 2 is: ', temp2);

    let duplicateObject = <any[]> JSON.parse(JSON.stringify(this.assessmentData.assessment));
    //console.log(duplicateObject);
    duplicateObject.forEach((x) =>{

      if(x.subs.length == 0){ x.subs = [null, null, null, null, null, null]}//fix to ensure subs is pre-populated. 0 means no selection.

      //if they have left and answer blank or a sub is not answered, datacheck has not passed.
      if(x.answer <= 3 && x.subs.indexOf(null) > -1){

        this.dataCheckPassed = false;

      }else {

        //here is where we can determined what we actually want to show on the chart. We need to set subs to [0,0,0,0,0,0] if they are satisfied and not motivated.
        //if satisfaction greater than neutral and motivation
        if(x.subs.indexOf(null) > -1){
          //todo: attempted to only show where they are not satisfied or arent motivated to change right now. its affecting the data on the view as well. The lock icons become grey. This is changing the data in the database :(
          x.subs = [0,0,0,0,0,0]; //TODO: this is changing the actual aseesment data :( need to change because its in a map function.//they are satisfied and not motivated to change.
        }

        //for each area on the series, we need to set what they selected from each area. 5 total. For example spiriitual.
        temp2.map((z, index)=> {
          //in each of the 5 things, get the values by index.
          //console.log('The data we are pushing to seriesData:', z);
          z.data.push(x.subs[index]);

        });

      }

    });

    //for each of the items in assessment data...
    /*this.userData.assessment.map((x) =>{

      if(x.subs.length == 0){ x.subs = [null,null,null,null,null,null]} //fix to ensure subs is pre-populated. 0 means no selection.

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

    });*/

    this.seriesdata = temp2;
    //console.log('SERIES DATA: ' , this.seriesdata); //only want the dimenstions thaty were populated!

  }


  goToDashboard() {

    if(this.route.snapshot.params['assessment_id']){
      this.router.navigate(['/dashboard/'+this.route.snapshot.children[0].params['user_id'] + "/" +this.route.snapshot.children[0].params['assessment_id']])  
  }

  }

}
