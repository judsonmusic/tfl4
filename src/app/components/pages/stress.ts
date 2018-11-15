import {Component, OnInit, OnDestroy} from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
declare var System:any;
declare var $:any;

@Component({
    selector: 'stress-page',
    templateUrl: './stress.html'
})


export class StressPage implements OnInit, OnDestroy {

    constructor(public route: ActivatedRoute, public router: Router){

    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }

    goToDashboard() {

        if (this.route.snapshot.params['assessment_id']) {
          this.router.navigate(['/dashboard/' + this.route.snapshot.params['user_id'] + "/" + this.route.snapshot.params['assessment_id']])
        }
    
      }


}

