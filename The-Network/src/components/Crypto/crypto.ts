import { Component } from '@angular/core';
import { CrytoData } from '../../injectables/Cryptodata';
import { Chart } from 'chart.js';

@Component ({
    selector: 'Crypto',
    templateUrl: './crypto.html',
    styleUrls: ['./crypto.scss']
})
export class Crypto {
    public cryptoData:any;
    graphed = false;
    chart = [];
    chart2 = [];
    constructor(private CryptoData:CrytoData){

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
    handleSearch(searchItem){
        let pricesARRY;
        let dateARRY;
        let newDATES = [];

        console.log(newDATES);
        this.CryptoData.getCryptoWeek(searchItem).subscribe((res) => {
            console.log(res);
            pricesARRY = res['0']['prices'];
            dateARRY = res['0']['timestamps'];
            for (let i = 0; i < dateARRY.length; i ++){
                newDATES.push(dateARRY[i].substring(0,10));
            }
            console.log(dateARRY);
            let weeklyGraphInfo = {
                Dates: newDATES.slice(32, 39),
                Data: (pricesARRY.slice(32, 39)),
                id: 'canvas'
            }
            let monthlyGraphInfo = {
                Dates: newDATES.slice(9, 39),
                Data: (pricesARRY.slice(9, 39)),
                id: 'canvas2'
            }
            let maxPast = {
                Dates: newDATES.slice(0, 39),
                Data: (pricesARRY.slice(0, 39)),
                id: 'canvas3'
            }
            this.graph(weeklyGraphInfo);
            this.graph(monthlyGraphInfo);
            this.graph(maxPast);
        })
    }
}