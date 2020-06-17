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
    chart2 = [];
    graphed = false;

    constructor(private StockData:StockData){

    }

    ngOnInit (){
        
    }
    graph(stock) {
        this.graphed = true;
        this.chart2 = new Chart(stock.id, {
            type: 'line',
            data: {
                labels: stock.Dates,
                datasets: [{
                    label: 'Value in USD$',
                    data: stock.Data,
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
    handleSearch(searchItem){
        const priceArry = []
        const dateArry = []
        const reversePriceArry = []
        const reverseDateArry = []
        this.StockData.getStock(searchItem).subscribe((res)=> {
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

            let weeklyGraphInfo = {
                Dates: reverseDateArry[0].slice(92, 99),
                Data: (reversePriceArry[0].slice(92, 99)),
                id: 'canvas'
            }
            let monthlyGraphInfo = {
                Dates: reverseDateArry[0].slice(69, 99),
                Data: (reversePriceArry[0].slice(69, 99)),
                id: 'canvas2'
            }
            let maxPast = {
                Dates: reverseDateArry[0].slice(0, 99),
                Data: (reversePriceArry[0].slice(0, 99)),
                id: 'canvas3'
            }
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
                currentValue: (reversePriceArry[0][99]),
            }
            this.graph(weeklyGraphInfo);
            this.graph(monthlyGraphInfo);
            this.graph(maxPast);
            }
        }
    )}
}