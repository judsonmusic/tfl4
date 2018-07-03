import { ActivatedRoute } from '@angular/router';
import{ Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AssessmentService} from "../assessment/assessment.service";
import {UserService} from "../user-service/user.service";
declare var System:any;
@Component({
  selector: 'action',
  templateUrl: 'action.component.html'
})
export class ActionComponent implements OnInit {

  public areas:any;
  public assessmentData: any[];
  public categories: any;
  public seriesdata: any;
  public h;

  constructor(public route: ActivatedRoute, public router: Router, public assessmentService: AssessmentService, public userService: UserService) {

    this.router = router;
    this.assessmentService = assessmentService;
    this.areas = this.assessmentService.questions;
    this.assessmentData = [];
    this.userService = userService;
  }

  makeSubs(){

    let temp = [];
    this.assessmentService.questions.map((x)=> {

      temp.push(x.category);

    });
    this.categories = temp;
    //console.log('Categories: ', temp);

    let colors = [
      "#002494",
      "#bc0015",
      "#039f71",
      "#e5d500",
      "#eb6b00",
      "#3082e1"
    ];


    let temp2 = [];
    //loop through sub questions and then get each map data to what they chose for each area.
    this.assessmentService.subquestions.map((x, i)=> {
      //console.log('Row:', i, x);
      let visible = i == 0;
      temp2.push({name: x.category, data:[], visible: visible, color: x.color});

    });


    this.assessmentData.map((x, y) =>{
      //for each area on the series, we need to set what they selected from each area. 5 total. For example spiriitual.
      temp2.map((z, index)=>{
        //in each of the 5 things, get the values by index.
        //console.log('The index of data we are pushing to:', index);
        z.data.push(x.subs[index]);
      });

    });


    this.seriesdata = temp2;
    //console.log('Series Data: ', temp2);



  }
  ngOnInit() {



    if(this.userService.userData) {

      this.assessmentData = this.userService.userData.assessment || [];
      this.makeSubs();

    }else{

      this.userService.user$.subscribe((userData) =>{

        this.assessmentData = userData.assessment || [];
        this.makeSubs();

      });


    }
   // console.log('ACTION: ', this.assessmentData);




  }


  goToDimension(id){

    this.router.navigate(['/dimensions/'+this.route.snapshot.params['assessment_id']+'/'+id]);

  }
}
