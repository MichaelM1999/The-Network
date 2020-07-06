import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { StockData } from '../../injectables/stockdata';
import { backendRoutes } from '../../injectables/backendRoutes';

@Component ({
    selector: 'Graph',
    templateUrl: './graphs.html',
    styleUrls: ['./graphs.scss']
}) 
export class Graph implements OnInit{
    public returnedStock:any
    public Title = '7-Days';
    public addingStock = '';
    chart = [];
    chart2 = [];
    graphed = false;
    followBox = false;
    allowedFollow = false
    constructor(private StockData:StockData, private API: backendRoutes){
    }

    ngOnInit (){
    }
    graphSwitch(graphValue){
        if (graphValue === 7){
            this.graph(this.returnedStock.weeklyGraphInfo);
            this.Title = "7-Days";
        } else if (graphValue === 30){
            this.graph(this.returnedStock.monthlyGraphInfo);
            this.Title = "30-Days";
        } else if (graphValue === 100){
            this.graph(this.returnedStock.maxPast);
            this.Title = "100-Days";
        }
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
        let admin = sessionStorage.getItem("username");
        if (admin) {
            this.allowedFollow = true;
        }
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
                id: 'canvas'
            }
            let maxPast = {
                Dates: reverseDateArry[0].slice(0, 99),
                Data: (reversePriceArry[0].slice(0, 99)),
                id: 'canvas'
            }
            //returning Graph Object
            this.returnedStock = {
                priceArry,
                dateArry,
                weeklyGraphInfo: weeklyGraphInfo,
                monthlyGraphInfo: monthlyGraphInfo,
                maxPast: maxPast,
                dailychange: ((reversePriceArry[0][99])-(reversePriceArry[0][98])).toString().slice(0,8),
                dailychangeCheck: Math.sign((reversePriceArry[0][99])-(reversePriceArry[0][98])),
                weeklychange: ((reversePriceArry[0][99])-(reversePriceArry[0][92])).toString().slice(0,8),
                weeklychangeCheck: Math.sign((reversePriceArry[0][99])-(reversePriceArry[0][92])),
                monthlychange: ((reversePriceArry[0][99])-(reversePriceArry[0][69])).toString().slice(0,8),
                monthlychangeCheck: Math.sign((reversePriceArry[0][99])-(reversePriceArry[0][69])),
                currentValue: (reversePriceArry[0][99]),
            }
            this.graph(this.returnedStock.weeklyGraphInfo);

            }
        }
    )}
    followDetails(searchItem){
    this.followBox = true;
    this.addingStock = searchItem
    }
    handleFollow(notes){
        console.log( typeof this.addingStock);
        let STOCK = {
            stock_name: this.addingStock,
            notes: notes['notesInput'],
            admin: sessionStorage.getItem('username')
        }
        this.API.followStock(STOCK).subscribe((res => {
            if(res['err']){
                window.alert(STOCK.stock_name + " has already been followed");
                this.addingStock = '';
                this.followBox = false;
            } else {
                window.location.href = '/src/stocks';
                this.addingStock = '';
                this.followBox = false;
            }
        }))
    }
}