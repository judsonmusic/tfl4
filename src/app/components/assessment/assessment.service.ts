import { UtilitiesService } from './../../utilities/utilities.component';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';



@Injectable()
export class AssessmentService{

  questions: any;
  subquestions: any;
  answers: any;
  assessment: any;


  constructor(public http: Http, public us: UtilitiesService) {

    this.http = http;

    this.questions = [


      {id: 1, question: "I feel my diet is healthy and that I am fueling my body for optimal performance. ", category: "Nutrition", templateUrl: "../dimensions/nutrition.html"},
      {id: 2, question: "I get adequate sleep and regularly take part in activities which help me recharge and destress.", category: "Relax",  templateUrl: "../dimensions/relax.html"},
      {id: 3, question: "I get enough exercise and movement throughout the day for optimal health.", category: "Activity",  templateUrl: "../dimensions/activity.html"},
      {id: 4, question: "I have a sense of self-worth, a positive attitude and I am free of current and/or past self-doubt and struggles.", category: "Emotional",  templateUrl: "../dimensions/emotional.html"},
      {id: 5, question: "I feel a connection to a higher source and have a sense of comfort knowing that I am part of something greater than myself.", category: "Spiritual", templateUrl: "../dimensions/spiritual.html"},
      {id: 6, question: "I am free of unhealthy behavior that impacts my overall Ideal Being.", category: "Habits",  templateUrl: "../dimensions/habits.html"},
      {id: 7, question: "I have a supportive social network and feel my relationships are healthy and fulfilling.", category: "Relationships",  templateUrl: "../dimensions/relationships.html"},
      {id: 8, question: "I routinely go to my doctor(s), follow medical recommendations and practice self-care.", category: "Health",  templateUrl: "../dimensions/health.html"},
      {id: 9, question: "I am satisfied with my economic position.", category: "Financial",  templateUrl: "../dimensions/financial.html"},
      {id: 10, question: "I engage in fun activities, hobbies and laugh often.", category: "Play",  templateUrl: "../dimensions/play.html"},
      {id: 11, question: "I feel a sense of fulfillment with the way I spend my time.", category: "Life Balance",  templateUrl: "../dimensions/life-balance.html"},
      {id: 12, question: "I feel a sense of peace and contentment in my home.", category: "Home",  templateUrl: "../dimensions/home.html"},
      {id: 13, question: "I feel that I am challenged and growing as a person.", category: "Intellect",  templateUrl: "../dimensions/intellectual.html"},
      {id: 14, question: "I am content with what I see when I look in the mirror.", category: "Self-Image",  templateUrl: "../dimensions/self-image.html"},
      {id: 15, question: "I feel engaged at work and valued by my employer.", category: "Purpose",  templateUrl: "../dimensions/purpose.html"}

    ];

    /*

     .swatch.swatch-blue {
     background: #04319e;
     }

     .swatch.swatch-light-blue {
     background: #3082e1;
     }

     .swatch.swatch-black {

     background: #333338;
     }

     .swatch.swatch-green {

     background: #089b6f;
     }

     .swatch.swatch-orange {

     background: #fe7d00;
     }

     .swatch.swatch-purple {

     background: #4600bd;

     }

     .swatch.swatch-yellow {

     background: #e5e300;

     }

     .swatch.swatch-red {

     background: #d10016;

     }




     */

    this.subquestions = [

      {id: "1", category: "Importance", question: "This dimension of my life is important to me.", color: "#04319e"}, //this answer needs to be > 3
        //we pulled this out because the answer should really be prefilled by the answer on the first questions.
      {id: "2", category: "Satisfaction", question: "I am satisfied with this dimension of my life.",  color: "#d10016"},
      {id: "3", category: "Performance", question: "This dimension impacts my work performance.",  color: "#089b6f"},
      {id: "4", category: "Happiness", question: "This dimension impacts my happiness.",  color: "#e5e300"},
      {id: "5", category: "Action", question: "I am actively working to improve and/or maintain this dimension of my life.",  color: "#fe7d00"},
      {id: "6", category: "Motivation", question: "I am motivated to improve and/or maintain this dimension of my life.",  color: "#3082e1"} //this answer needs to be < 4

    ];


    this.answers = [

      {id: 1, value: "Strongly Disagree"},
      {id: 2, value: "Disagree"},
      {id: 3, value: "Neutral"},
      {id: 4, value: "Agree"},
      {id: 5, value: "Strongly Agree"}

    ];

    this.assessment = [

      {id: 1, answer: "", subs: []},
      {id: 2, answer: "", subs: []},
      {id: 3, answer: "", subs: []},
      {id: 4, answer: "", subs: []},
      {id: 5, answer: "", subs: []},
      {id: 6, answer: "", subs: []},
      {id: 7, answer: "", subs: []},
      {id: 8, answer: "", subs: []},
      {id: 9, answer: "", subs: []},
      {id: 10, answer: "", subs: []},
      {id: 11, answer: "", subs: []},
      {id: 12, answer: "", subs: []},
      {id: 13, answer: "", subs: []},
      {id: 14, answer: "", subs: []},
      {id: 15, answer: "", subs: []}

    ];


  }

  getDimension(id){

      return this.questions.filter(
        (item:any) => item.id === id)[0];

  }

  getSubsForDimension(assessment, id){
    //console.log('ASSESSMENT FOR FILTER', id, assessment);
    return assessment.filter(
      (item:any) => item.id == id);

  }

  getAnswerForQuestion(assessment, id){

    return assessment.filter(
      (item:any) => item.id == id);


  }

  getHtmlForDimension(templateUrl){

    return this.http.get(templateUrl).map((response) => {

      return response['_body'];

    });

  }

  aggregate(id?){

    let headers = new Headers();
    let userId = id || ""; 
      headers.append('x-access-token', sessionStorage['jwt']);
      return this.http
        .get(this.us.apiUrl() + '/api/assessment/aggregate' + userId, {headers : headers} )
        .map(res => res.json())
        .map((res) => {         
            return res;          
        }, (error) => console.log('There was an error', error));

  }

  getByUserId(userId, assessmentId?){
    let assessment_id = '';
    if(assessmentId) assessment_id = assessmentId;
    let headers = new Headers();   
      headers.append('x-access-token', sessionStorage['jwt']);
      return this.http
        .get(this.us.apiUrl() + '/api/assessment/getByUserId/' + userId + '/' + assessment_id, {headers : headers} )
        .map(res => res.json())
        .map((res) => {         
            return res;          
        }, (error) => console.log('There was an error', error));

  }

  updateAssessment(assessment){
    let headers = new Headers();   
      headers.append('x-access-token', sessionStorage['jwt']);
      return this.http
        .put(this.us.apiUrl() + '/api/assessment/updateAssessment/' + assessment._id, assessment, {headers : headers} )
        .map(res => res.json())
        .map((res) => {      
          //console.log('Assessment Updated:', res);   
            return res;          
        }, (error) => console.log('There was an error', error));

  }

  createAssessment(assessment){
    let headers = new Headers();   
      headers.append('x-access-token', sessionStorage['jwt']);
      return this.http
        .post(this.us.apiUrl() + '/api/assessment/createAssessment', assessment, {headers : headers} )
        .map(res => res.json())
        .map((res) => {      
          //console.log('Assessment Updated:', res);   
            return res;          
        }, (error) => console.log('There was an error', error));

  }

  deleteAssessment(assessment){
    let headers = new Headers();   
      headers.append('x-access-token', sessionStorage['jwt']);
      return this.http
        .put(this.us.apiUrl() + '/api/assessment/deleteAssessment/' + assessment._id, assessment, {headers : headers} )
        .map(res => res.json())
        .map((res) => {      
          //console.log('Assessment Updated:', res);   
            return res;          
        }, (error) => console.log('There was an error', error));

  }

}
