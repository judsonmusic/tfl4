"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var assessment_service_1 = require("../assessment/assessment.service");
var user_service_1 = require("../user-service/user.service");
var BarChartComponent = (function () {
    function BarChartComponent(assessmentService, userService) {
        this.assessmentService = assessmentService;
        this.userService = userService;
    }
    BarChartComponent.prototype.ngOnInit = function () {
    };
    BarChartComponent.prototype.ngAfterViewInit = function () {
        this.renderChart();
    };
    BarChartComponent.prototype.renderChart = function () {
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
        var tempcats = [];
        this.categories.map(function (item) {
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
                    formatter: function () {
                        return this['value']; //+"%";
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
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarChartComponent.prototype, "selector", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarChartComponent.prototype, "heading", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarChartComponent.prototype, "seriesdata", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarChartComponent.prototype, "categories", void 0);
    BarChartComponent = __decorate([
        core_1.Component({
            selector: 'bar-chart',
            template: "<div id=\"{{selector}}\" style=\"min-width: 310px; height: 400px; margin: 0 auto\"></div>"
        }), 
        __metadata('design:paramtypes', [assessment_service_1.AssessmentService, user_service_1.UserService])
    ], BarChartComponent);
    return BarChartComponent;
}());
exports.BarChartComponent = BarChartComponent;
//# sourceMappingURL=barChart.component.js.map