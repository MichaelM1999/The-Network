import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { StockData } from '../../injectables/stockdata';

@Component ({
    selector: 'Graph',
    templateUrl: './graphs.html',
    styleUrls: ['./graphs.scss']
}) 
export class Graph implements OnInit{
    public returnedStock:any
    chart = [];

    constructor(private StockData:StockData){

    }

    ngOnInit (){
        
    }
    handleSearch(searchItem) {
        const priceArry = [];
        const dateArry = [];
        const reversePriceArry = [];
        const reverseDateArry = [];
        this.StockData.getStock(searchItem).subscribe((res) => {
            if (res["Error Message"]){
                window.alert("Not a real stock name");
            } else {
                

            
            let dailyseries = res["Time Series (Daily)"]

            for (let key in dailyseries){
                dateArry.push([key][0])
                priceArry.push(dailyseries[key]['4. close']);
            }
            reversePriceArry.push(priceArry.reverse())
            reverseDateArry.push(dateArry.reverse())
            //date arrays
            let weeklyDates = reverseDateArry[0].slice(92, 99)
            let monthlyDates = reverseDateArry[0].slice(69, 99)
            //returning Graph Object
            this.returnedStock = {
                priceArry,
                dateArry,
                dailychange: ((reversePriceArry[0][99])-(reversePriceArry[0][98])).toString().slice(0,8),
                dailychangeCheck: Math.sign((reversePriceArry[0][99])-(reversePriceArry[0][98])),
                weeklychange: ((reversePriceArry[0][99])-(reversePriceArry[0][92])).toString().slice(0,8),
                weeklychangeCheck: Math.sign((reversePriceArry[0][99])-(reversePriceArry[0][92])),
                monthlychange: ((reversePriceArry[0][99])-(reversePriceArry[0][69])).toString().slice(0,8),
                monthlychangeCheck: Math.sign((reversePriceArry[0][99])-(reversePriceArry[0][69])),
                weeklyDates: (weeklyDates),
                weeklyData: (reversePriceArry[0].slice(92, 99)),
                monthlyDates: (monthlyDates),
                monthlyData: (reversePriceArry[0].slice(69, 99)),
                currentValue: (reversePriceArry[0][99]),
            }
            //Creating Charts
            this.chart = new Chart('canvas', {
                type: 'line',
                data: {
                    labels: this.returnedStock.weeklyDates,
                    datasets: [{
                        label: 'Value in USD$',
                        data: this.returnedStock.weeklyData,
                        backgroundColor: [
                            'rgba(10, 245, 155, 0.2)',
                            'rgba(10, 245, 155, 0.2)',
                            'rgba(10, 245, 155, 0.2)',
                            'rgba(10, 245, 155, 0.2)',
                            'rgba(10, 245, 155, 0.2)',
                            'rgba(10, 245, 155, 0.2)'
                        ],
                        borderColor: [
                            'rgba(0, 0, 0, 1)',
                            'rgba(0, 0, 0, 1)',
                            'rgba(0, 0, 0, 1)',
                            'rgba(0, 0, 0, 1)',
                            'rgba(0, 0, 0, 1)',
                            'rgba(0, 0, 0, 1)'
                        ],
                        borderWidth: 1
                        }]
                    },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                }}]}}
                })
            }
        })
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