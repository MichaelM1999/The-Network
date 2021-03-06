import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockData } from '../../injectables/stockdata';
import { Chart } from 'chart.js';

@Component({
    templateUrl:'./stockDetails.html',
    styleUrls:['./stockDetails.scss'],
})
export class StockDetailsComponent {
    public returnedStock: any;
    public Title = '7-Days';
    graphed = false;
    stock:any
    chart = [];
    chart2 =[];
    constructor( private stockSearch: StockData,
        private route:ActivatedRoute) {

    }
    ngOnInit() {
        this.stock = (this.route.snapshot.params['name'])
        this.stockInfo(this.stock)
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
    stockInfo(searchItem){
        const priceArry = []
        const dateArry = []
        const volumeArry = []
        const reversePriceArry = []
        const reverseDateArry = []
        const reverseVolumeArry = []
        this.stockSearch.getStockAuto(searchItem).subscribe((res)=> {
            console.log();
            console.log(res)
            let dailyseries = res["Time Series (Daily)"]

            for (let key in dailyseries){
                dateArry.push([key][0])
                priceArry.push(dailyseries[key]['4. close']);
                volumeArry.push(dailyseries[key]["6. volume"])
            }
            reverseVolumeArry.push(volumeArry.reverse())
            reversePriceArry.push(priceArry.reverse())
            reverseDateArry.push(dateArry.reverse())

            let weeklyDates = reverseDateArry[0].slice(92, 99)
            let monthlyDates = reverseDateArry[0].slice(69, 99)
            
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

            this.returnedStock = {
                priceArry,
                name:searchItem,
                dateArry,
                weeklyGraphInfo: weeklyGraphInfo,
                monthlyGraphInfo: monthlyGraphInfo,
                maxPast: maxPast,
                dailychange: ((reversePriceArry[0][99])-(reversePriceArry[0][98])).toString().slice(0,8),
                dailychangeCheck: Math.sign((reversePriceArry[0][99])-(reversePriceArry[0][98])),
                weeklychange: ((reversePriceArry[0][99])-(reversePriceArry[0][92])).toString().slice(0,8),
                weeklychangeCheck: Math.sign((reversePriceArry[0][99])-(reversePriceArry[0][98])),
                monthlychange: ((reversePriceArry[0][99])-(reversePriceArry[0][69])).toString().slice(0,8),
                monthlychangeCheck: Math.sign((reversePriceArry[0][99])-(reversePriceArry[0][98])),
                weeklyDates: (reverseDateArry[0].slice(92, 99)),
                weeklyData: (reversePriceArry[0].slice(92, 99)),
                monthlyDates: (monthlyDates),
                monthlyData: (reversePriceArry[0].slice(69, 99)),
                currentValue: (reversePriceArry[0][99]),
                volume: reverseVolumeArry[0][99],
                dailyPercentage: ((reversePriceArry[0][98])/(reversePriceArry[0][99])-1),
            }
            this.graph(this.returnedStock.weeklyGraphInfo);
            }
    )
    }  
}