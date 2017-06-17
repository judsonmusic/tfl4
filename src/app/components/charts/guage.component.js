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
var GaugeComponent = (function () {
    function GaugeComponent() {
    }
    GaugeComponent.prototype.ngOnInit = function () {
    };
    GaugeComponent.prototype.ngAfterViewInit = function () {
        this.renderChart();
    };
    GaugeComponent.prototype.renderChart = function () {
        var self = this;
        if (!self.seriesdata) {
            self.seriesdata = 0;
        }
        this.chart = Highcharts.chart(this.selector, {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                backgroundColor: '#337ab7'
            },
            title: {
                text: 'Stress Gauge',
                style: {
                    color: "#ffffff"
                }
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                        backgroundColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [
                                [0, '#FFF'],
                                [1, '#333']
                            ]
                        },
                        borderWidth: 0,
                        outerRadius: '109%'
                    }, {
                        backgroundColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [
                                [0, '#333'],
                                [1, '#FFF']
                            ]
                        },
                        borderWidth: 1,
                        outerRadius: '107%'
                    }, {}, {
                        backgroundColor: '#337ab7',
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
            },
            // the value axis
            yAxis: {
                min: 0,
                max: 100,
                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',
                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: 'km/h'
                },
                plotBands: [{
                        from: 0,
                        to: 40,
                        color: '#55BF3B' // green
                    },
                    {
                        from: 40,
                        to: 60,
                        color: 'yellow' // yellow
                    },
                    {
                        from: 60,
                        to: 80,
                        color: 'orange' // orange
                    },
                    {
                        from: 80,
                        to: 100,
                        color: '#DF5353' // red
                    }]
            },
            navigation: {
                buttonOptions: {
                    enabled: false
                }
            },
            series: [{
                    name: 'Speed',
                    data: [self.seriesdata],
                    tooltip: {
                        valueSuffix: ' km/h'
                    }
                }]
        }, 
        /**
         * In the chart load callback, add icons on top of the circular shapes
         */
        function callback() {
        });
    };
    GaugeComponent.prototype.ngOnChanges = function (changes) {
        if (this.chart && !this.chart.renderer.forExport) {
            this.chart.series[0].points[0].update(this.seriesdata);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], GaugeComponent.prototype, "selector", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], GaugeComponent.prototype, "heading", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GaugeComponent.prototype, "seriesdata", void 0);
    GaugeComponent = __decorate([
        core_1.Component({
            selector: 'gauge-chart',
            template: "<div id=\"{{selector}}\" style=\"width: 280px; height: 280px; margin: 10px auto;\"></div>"
        }), 
        __metadata('design:paramtypes', [])
    ], GaugeComponent);
    return GaugeComponent;
}());
exports.GaugeComponent = GaugeComponent;
//# sourceMappingURL=guage.component.js.map