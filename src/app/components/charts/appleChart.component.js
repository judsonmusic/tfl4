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
var AppleChartComponent = (function () {
    function AppleChartComponent() {
    }
    AppleChartComponent.prototype.ngOnInit = function () {
    };
    AppleChartComponent.prototype.ngAfterViewInit = function () {
        this.renderChart();
    };
    AppleChartComponent.prototype.renderChart = function () {
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
        Highcharts.chart(this.selector, {
            chart: {
                type: 'solidgauge',
                marginTop: 50
            },
            title: {
                text: this.heading,
                style: {
                    fontSize: '24px'
                }
            },
            tooltip: {
                borderWidth: 0,
                backgroundColor: 'none',
                shadow: false,
                style: {
                    fontSize: '12px'
                },
                pointFormat: '{series.name}<br><span style="font-size:16px; color: {point.color}; font-weight: bold">{point.y}%</span>',
                positioner: function (labelWidth, labelHeight) {
                    return {
                        x: 140 - labelWidth / 2,
                        y: 130
                    };
                }
            },
            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{
                        outerRadius: '115%',
                        innerRadius: '100%',
                        backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
                        borderWidth: 0
                    }, {
                        outerRadius: '99%',
                        innerRadius: '85%',
                        backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.3).get(),
                        borderWidth: 0
                    }, {
                        outerRadius: '84%',
                        innerRadius: '70%',
                        backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2]).setOpacity(0.3).get(),
                        borderWidth: 0
                    },
                    {
                        outerRadius: '69%',
                        innerRadius: '55%',
                        backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0.3).get(),
                        borderWidth: 0
                    },
                    {
                        outerRadius: '54%',
                        innerRadius: '40%',
                        backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[4]).setOpacity(0.3).get(),
                        borderWidth: 0
                    }]
            },
            yAxis: {
                min: 0,
                max: 100,
                lineWidth: 0,
                tickPositions: []
            },
            plotOptions: {
                solidgauge: {
                    borderWidth: '12px',
                    dataLabels: {
                        enabled: false
                    },
                    linecap: 'round',
                    stickyTracking: false
                }
            },
            series: [{
                    name: 'Satisfied',
                    borderColor: Highcharts.getOptions().colors[0],
                    data: [{
                            color: Highcharts.getOptions().colors[0],
                            radius: '107%',
                            innerRadius: '107%',
                            y: this.seriesdata[0]
                        }]
                }, {
                    name: 'Importance',
                    borderColor: Highcharts.getOptions().colors[1],
                    data: [{
                            color: Highcharts.getOptions().colors[1],
                            radius: '92%',
                            innerRadius: '92%',
                            y: this.seriesdata[1]
                        }]
                }, {
                    name: 'Motivation',
                    borderColor: Highcharts.getOptions().colors[2],
                    data: [{
                            color: Highcharts.getOptions().colors[2],
                            radius: '77%',
                            innerRadius: '77%',
                            y: this.seriesdata[2]
                        }]
                },
                {
                    name: 'Happiness',
                    borderColor: Highcharts.getOptions().colors[3],
                    data: [{
                            color: Highcharts.getOptions().colors[3],
                            radius: '62%',
                            innerRadius: '62%',
                            y: this.seriesdata[3]
                        }]
                },
                {
                    name: 'Performance',
                    borderColor: Highcharts.getOptions().colors[4],
                    data: [{
                            color: Highcharts.getOptions().colors[4],
                            radius: '47%',
                            innerRadius: '47%',
                            y: this.seriesdata[4]
                        }]
                }]
        }, 
        /**
         * In the chart load callback, add icons on top of the circular shapes
         */
        function callback() {
            //alert('Chart Loaded!');
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AppleChartComponent.prototype, "selector", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AppleChartComponent.prototype, "heading", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AppleChartComponent.prototype, "seriesdata", void 0);
    AppleChartComponent = __decorate([
        core_1.Component({
            selector: 'apple-chart',
            template: "<div id=\"{{selector}}\" style=\"width: 280px; height: 280px; margin: 10px auto;\"></div>"
        }), 
        __metadata('design:paramtypes', [])
    ], AppleChartComponent);
    return AppleChartComponent;
}());
exports.AppleChartComponent = AppleChartComponent;
//# sourceMappingURL=appleChart.component.js.map