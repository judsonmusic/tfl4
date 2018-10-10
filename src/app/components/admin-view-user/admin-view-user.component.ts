import { HeaderComponent } from './../layout/header.component';
import { UserService } from './../user-service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from './../assessment/assessment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-view-user',
  templateUrl: './admin-view-user.component.html',
  styleUrls: ['./admin-view-user.component.css']
})
export class AdminViewUserComponent implements OnInit {
  public user;
  public assessmentData;
  public assessmentComplete:boolean = false;
  constructor(public as: AssessmentService, public us: UserService, public route: ActivatedRoute, public router: Router) { 

  }

  ngOnInit() {

    if(typeof this.route.snapshot.params["user_id"] != 'undefined'){
      var id = this.route.snapshot.params["user_id"];

      this.us.getUserById(id).subscribe(res=>{

        this.user = res;

        console.log(this.user);

        this.as.getByUserId(id).subscribe(res2=>{
          this.assessmentData = res2;  
          console.log(this.assessmentData);                
    
        })
      })
      

    }

   
  }
  
  checkComplete(a){


    var temp = [];
 

    a.assessment.map((obj) => {
     
        temp.push(obj.answer != "");

    });

    console.log('First 15 questions: ', temp, temp.indexOf(false) > -1);

    return temp.indexOf(false) > -1;

    //this.allUnlocked = temp.indexOf(false) === -1;
    //this.assessmentData.steps[6] = this.allUnlocked;


}


  loadAssessment(assessmentData){
    console.log(assessmentData);
      this.router.navigate(['/dashboard/' + this.user._id + "/" + assessmentData._id]);
    }  
   
  

}
