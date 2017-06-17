import {Component, Input, OnInit} from '@angular/core';
import {AssessmentService} from "../assessment/assessment.service";
import {UserService} from "../user-service/user.service";

declare var jQuery:any;
declare var Highcharts:any;

@Component({
  selector: 'bar-chart',
  template: `<div id="{{selector}}" style="min-width: 310px; height: 400px; margin: 0 auto"></div>`
})
export class BarChartComponent implements OnInit {

  @Input() selector: string;
  @Input() heading: string;
  @Input() seriesdata: any;
  @Input() categories: any;



  ngOnInit(){


  }

  constructor(public assessmentService: AssessmentService, public userService: UserService) {

  }


  ngAfterViewInit() {
      this.renderChart();
  }

  renderChart() {

    //console.log('The series data ', this.seriesdata);

    /*if (!Highcharts.theme) {
      Highcharts.setOptions({
        chart: {
          backgroundColor: 'black'
        },
        colors: ['#F62366', '#9DFF02', '#0CCDD6'],
        title: {
          style: {
            color: 'silver'
          }
        },
        tooltip: {
          style: {
            color: 'silver'
          }
        }
      });
    }*/

    let tempcats = [];

    this.categories.map((item)=>{

      tempcats.push(item.category);

    });

    //console.log('Categories for chart', tempcats);
    //console.log('Series Data  for chart', this.seriesdata);

    //now that we have the dimension that we want to populate data for...Build series data...

    Highcharts.chart(this.selector, {

      chart: {
        type: 'column'
      },
      title: {
        text: this.heading
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        categories: tempcats,
        crosshair: true
      },
      yAxis: {
        min: 0,
        max: 100,
        tickInterval: 20,
        title: {
          text: 'Score'
        },
        labels: {
          formatter: function() {
            return this['value'];//+"%";
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.05,
          borderWidth: 0
        }
      },
      //for series we need to loop through each area and then get data from each on in service.

      series: this.seriesdata
    });
  }
}
