import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
declare var Highcharts: any;

@Component({
    selector: 'gauge-chart',
    template: `<div id="{{selector}}" style="width: 280px; height: 280px; margin: 10px auto;"></div>`
})
export class GaugeComponent implements OnInit {

    @Input() selector: string;
    @Input() heading: string;
    @Input() seriesdata: any;

    public chart;

    ngOnInit() {


    }

    constructor() {


    }


    ngAfterViewInit() {
        this.renderChart();
    }

    renderChart() {

        var self = this;

        if(!self.seriesdata){
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
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, '#FFF'],
                                [1, '#333']
                            ]
                        },
                        borderWidth: 0,
                        outerRadius: '109%'
                    }, {
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, '#333'],
                                [1, '#FFF']
                            ]
                        },
                        borderWidth: 1,
                        outerRadius: '107%'
                    }, {
                        // default background
                    }, {
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


    }


    ngOnChanges(changes: SimpleChanges) {

        if (this.chart && !this.chart.renderer.forExport) {

            this.chart.series[0].points[0].update(this.seriesdata);

        }

    }


    /*
     function (chart) {
     if (!chart.renderer.forExport) {

     }
     }*/


}
