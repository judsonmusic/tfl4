import { UtilitiesService } from './../../utilities/utilities.component';
import { UserService } from './../user-service/user.service';
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';


@Injectable()
export class SurveyService {

  questions: any;
  answers: any;
  assessment: any;
  survey: any;
  surveyComplete: boolean;


  constructor(public http: Http, public us: UtilitiesService) {

    this.http = http;

    /***
     *  this.questions = [

      {id: 1, question: "Taking the Train For Life (TFL) assessment was a valuable experience."},
      {id: 2, question: "The TFL assessment results reflect my life accurately."},
      {id: 3, question: "I am going to take action in one or more of the dimensions that are important to me. "},
      {id: 4, question: "My perspective of well-being has broadened because of this assessment."},
      {id: 5, question: "I believe the 15 dimensions included in the Ideal Being Model are comprehensive."},
      {id: 6, question: "I am more self-aware of my overall well-being because of this assessment."},
      {id: 7, question: "I am more self-aware of what is causing me stress because of this assessment."},
      {id: 8, question: "I would value “one” TFL coaching session to design a TFL Action Plan based on the dimensions that are important to me."},
      {id: 9, question: "I would be interested in ongoing TFL coaching, to focus on self-awareness and self-care, stress management and resiliency training, and mindfulness practice and goal setting."},
      {id: 10, question: "I would recommend the TFL assessment to others."},
      {id: 11, question: "I am going to use the tools and resources provided in the TFL Action Plans, in the dimensions that are important to me."},
      {id: 12, question: "I would like to learn how I can better manage stress."},
      {id: 13, question: "I found the TFL assessment and site content thorough, helpful and encouraging."},
      {id: 14, question: "I found the TFL assessment and site content easy to understand and navigate."},
      {id: 15, question: "I liked the TFL reporting and charts."},
      {id: 16, question: "I would be interested in learning more about additional Train For Life services, assessments, workshops, and programs."},      
      /*{id: 100, question: "I think the assessment is worth:"},
      {id: 101, question: "Additional Feedback"}

    ]; */

    this.questions = [

      {id: 1, question: "Taking the Train For Life (TFL) assessment was a valuable experience."},
      {id: 2, question: "My perspective of well-being has broadened."},
      {id: 3, question: "I am more self-aware of my overall well-being."},
      {id: 4, question: "I am more self-aware of where I am motivated to take action."},
      {id: 5, question: "I am more self-aware of what is causing me stress."},
      {id: 6, question: "I would like to learn how I can better manage stress."},
      {id: 7, question: "I am going to take action in one or more of the dimensions that are important to me."},
      {id: 8, question: "The 15 dimensions selected to be part of the Ideal Being Model represent the different areas of my life in a comprehensive manner?"},
      {id: 9, question: "I would value one or more coaching sessions to design a TFL Action Plan based on the dimensions that are important to me."},
      {id: 10, question: "I would like to learn more about how I can reach a state of optimal health and happiness"},
      {id: 11, question: "I am going to use the tools and resources provided on the site."},
      {id: 12, question: "I found the site easy to understand and navigate."},   
      /*{id: 100, question: "I think the assessment is worth:"},*/
      {id: 101, question: "Additional Feedback"}

    ];

    this.answers = [

      {id: 1, value: "Strongly Disagree"},
      {id: 2, value: "Disagree"},
      {id: 3, value: "Neutral"},
      {id: 4, value: "Agree"},
      {id: 5, value: "Strongly Agree"}

    ];

    this.survey = [

      {id: 1, answer: ""},
      {id: 2, answer: ""},
      {id: 3, answer: ""},
      {id: 4, answer: ""},
      {id: 5, answer: ""},
      {id: 6, answer: ""},
      {id: 7, answer: ""},
      {id: 8, answer: ""},
      {id: 9, answer: ""},
      {id: 10, answer: ""},
      {id: 11, answer: ""},
      {id: 12, answer: ""},
      /*{id: 100, answer: ""},*/
      {id: 101, answer: ""}

    ];
  }

  get(id?){

    let headers = new Headers();
    let userId = id || ""; 
      headers.append('x-access-token', sessionStorage['jwt']);
      return this.http
        .get(this.us.apiUrl() + '/api/survey/' + userId, {headers : headers} )
        .map(res => res.json())
        .map((res) => {         
            return res;          
        }, (error) => console.log('There was an error', error));

  }

  aggregate(id?){

    let headers = new Headers();
    let userId = id || ""; 
      headers.append('x-access-token', sessionStorage['jwt']);
      return this.http
        .get(this.us.apiUrl() + '/api/survey/aggregate' + userId, {headers : headers} )
        .map(res => res.json())
        .map((res) => {         
            return res;          
        }, (error) => console.log('There was an error', error));

  }

  public checkComplete(userData) {

    let complete = [];

    if(userData.survey.length > 0) {

      userData.survey.map((item)=> {

        if (item.id == 101 || item.id == 100 || item.answer != "") {

          complete.push(true);

        } else {

          complete.push(false);

        }

      });

      this.surveyComplete = complete.indexOf(false) == -1;

    }else{

      this.surveyComplete = false;
    }


  }
}
