import { UtilitiesService } from './../../utilities/utilities.component';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DimensionService {

    dimensions: any;

    constructor(public http: Http, public us: UtilitiesService) {

        this.dimensions = [

            { id: 1, barriers: [], tools: [], stressLevel: 0 },
            { id: 2, barriers: [], tools: [], stressLevel: 0 },
            { id: 3, barriers: [], tools: [], stressLevel: 0 },
            { id: 4, barriers: [], tools: [], stressLevel: 0 },
            { id: 5, barriers: [], tools: [], stressLevel: 0 },
            { id: 6, barriers: [], tools: [], stressLevel: 0 },
            { id: 7, barriers: [], tools: [], stressLevel: 0 },
            { id: 8, barriers: [], tools: [], stressLevel: 0 },
            { id: 9, barriers: [], tools: [], stressLevel: 0 },
            { id: 10, barriers: [], tools: [], stressLevel: 0 },
            { id: 11, barriers: [], tools: [], stressLevel: 0 },
            { id: 12, barriers: [], tools: [], stressLevel: 0 },
            { id: 13, barriers: [], tools: [], stressLevel: 0 },
            { id: 14, barriers: [], tools: [], stressLevel: 0 },
            { id: 15, barriers: [], tools: [], stressLevel: 0 },


        ];
    }

    getStressData(id?) {

        let headers = new Headers();
        let userId = id || "";
        headers.append('x-access-token', sessionStorage['jwt']);
        return this.http
            .get(this.us.apiUrl() + '/api/dimensions/stress-data' + userId, { headers: headers })
            .map(res => res.json())
            .map((res) => {
                return res;
            }, (error) => console.log('There was an error', error));

    }


}
