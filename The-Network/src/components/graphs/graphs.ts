import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { StockData } from '../../injectables/stockdata';

@Component ({
    selector: 'Graph',
    templateUrl: './graphs.html',
    styleUrls: ['./graphs.scss']
}) 
export class Graph implements OnInit{
    chart = [];

    constructor(private StockData:StockData){

    }

    ngOnInit (){
        
    }
    graph() {
        console.log(this.chart, "ah");
        this.chart = new Chart('canvas', {
            type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },
            options: {
            }
        })
    }
}