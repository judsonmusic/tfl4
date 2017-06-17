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
var DonutChartComponent = (function () {
    function DonutChartComponent() {
    }
    DonutChartComponent.prototype.ngOnInit = function () {
    };
    DonutChartComponent.prototype.ngAfterViewInit = function () {
        this.renderChart();
    };
    DonutChartComponent.prototype.renderChart = function () {
        Highcharts.chart(this.selector, {
            chart: {
                type: 'solidgauge',
                marginTop: 50
            },
            title: {
                text: 'Spiritual',
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
                    name: 'Move',
                    borderColor: Highcharts.getOptions().colors[0],
                    data: [{
                            color: Highcharts.getOptions().colors[0],
                            radius: '107%',
                            innerRadius: '107%',
                            y: 80
                        }]
                }, {
                    name: 'Exercise',
                    borderColor: Highcharts.getOptions().colors[1],
                    data: [{
                            color: Highcharts.getOptions().colors[1],
                            radius: '92%',
                            innerRadius: '92%',
                            y: 65
                        }]
                }, {
                    name: 'Stand',
                    borderColor: Highcharts.getOptions().colors[2],
                    data: [{
                            color: Highcharts.getOptions().colors[2],
                            radius: '77%',
                            innerRadius: '77%',
                            y: 50
                        }]
                },
                {
                    name: 'Blah',
                    borderColor: Highcharts.getOptions().colors[3],
                    data: [{
                            color: Highcharts.getOptions().colors[3],
                            radius: '62%',
                            innerRadius: '62%',
                            y: 35
                        }]
                },
                {
                    name: 'Blah2',
                    borderColor: Highcharts.getOptions().colors[4],
                    data: [{
                            color: Highcharts.getOptions().colors[4],
                            radius: '47%',
                            innerRadius: '47%',
                            y: 50
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
    ], DonutChartComponent.prototype, "selector", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DonutChartComponent.prototype, "heading", void 0);
    DonutChartComponent = __decorate([
        core_1.Component({
            selector: 'donut-chart',
            template: "<div id=\"{{selector}}\" style=\"width: 280px; height: 280px; margin: 0 auto\"></div>"
        }), 
        __metadata('design:paramtypes', [])
    ], DonutChartComponent);
    return DonutChartComponent;
}());
exports.DonutChartComponent = DonutChartComponent;
//# sourceMappingURL=donutChart.component.js.map