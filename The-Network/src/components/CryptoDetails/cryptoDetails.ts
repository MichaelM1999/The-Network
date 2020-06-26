import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrytoData } from '../../injectables/Cryptodata';
import { Chart } from 'chart.js';

@Component({
    templateUrl:'./cryptoDetails.html',
    styleUrls: ['./cryptoDetails.scss'],
})
export class CryptoDetailsComponent {
    public returnedCrypto: any;
    public Title = '7-Days'
    crypto:any;
    graphed: boolean;
    chart = [];
    chart2 =[];
    constructor( private CryptoData: CrytoData,
        private route:ActivatedRoute) {

    }
    ngOnInit() {
        this.crypto = (this.route.snapshot.params['name'])
        this.handleSearch(this.crypto);
    }
    graphSwitch(graphValue){
        if (graphValue === 7){
            this.graph(this.returnedCrypto.weeklyGraphInfo);
            this.Title = "7-Days";
        } else if (graphValue === 30){
            this.graph(this.returnedCrypto.monthlyGraphInfo);
            this.Title = "30-Days";
        } else if (graphValue === 40){
            this.graph(this.returnedCrypto.maxPast);
            this.Title = "40-Days";
        }
    }
        handleSearch(searchItem){
            let pricesARRY;
            let dateARRY;
            let newDATES = [];
    
            this.CryptoData.getCryptoWeekAuto(searchItem).subscribe((res) => {
                if (Object.keys(res).length === 0){
                    window.alert("Enter a valid CryptoCurrency");
                } else {
                pricesARRY = res['0']['prices'];
                dateARRY = res['0']['timestamps'];
                for (let i = 0; i < dateARRY.length; i ++){
                    newDATES.push(dateARRY[i].substring(0,10));
                }
                let weeklyGraphInfo = {
                    Dates: newDATES.slice(32, 39),
                    Data: (pricesARRY.slice(32, 39)),
                    id: 'canvas'
                }
                let monthlyGraphInfo = {
                    Dates: newDATES.slice(9, 39),
                    Data: (pricesARRY.slice(9, 39)),
                    id: 'canvas'
                }
                let maxPast = {
                    Dates: newDATES.slice(0, 39),
                    Data: (pricesARRY.slice(0, 39)),
                    id: 'canvas'
                }
                this.returnedCrypto = {
                    name: searchItem,
                    weeklyGraphInfo: weeklyGraphInfo,
                    monthlyGraphInfo: monthlyGraphInfo,
                    maxPast: maxPast,
                    dailychange: ((pricesARRY[39])-(pricesARRY[38])),
                    dailychangeCheck: Math.sign((pricesARRY[39])-(pricesARRY[38])),
                    weeklychange: ((pricesARRY[39])-(pricesARRY[32])).toString().slice(0,8),
                    weeklychangeCheck: Math.sign((pricesARRY[39])-(pricesARRY[32])),
                    monthlychange: ((pricesARRY[39])-(pricesARRY[9])).toString().slice(0,8),
                    monthlychangeCheck: Math.sign((pricesARRY[39])-(pricesARRY[9])),
                    currentValue: (pricesARRY[39]),
                    dailyPercentage: ((pricesARRY[38])/(pricesARRY[39])-1),
                    weeklyPercentage: ((pricesARRY[32])/(pricesARRY[39])-1),
                    monthlyPercentage: ((pricesARRY[9])/(pricesARRY[39])-1),
                }
                this.graph(this.returnedCrypto.weeklyGraphInfo);
            }
            })
        }
        graph(Data){
            this.graphed = true;
            this.chart2 = new Chart(Data.id, {
                type: 'line',
                data: {
                    labels: Data.Dates,
                    datasets: [{
                        label: 'Value in USD$',
                        data: Data.Data,
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
    
}