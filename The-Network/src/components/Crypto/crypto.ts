import { Component } from '@angular/core';
import { CrytoData } from '../../injectables/Cryptodata';
import { Chart } from 'chart.js';
import { backendRoutes } from '../../injectables/backendRoutes';

@Component ({
    selector: 'Crypto',
    templateUrl: './crypto.html',
    styleUrls: ['./crypto.scss']
})
export class Crypto {
    public cryptoData:any;
    public Title = "7-Days";
    public addingCrypto = '';
    graphed = false;
    followBox = false;
    allowedFollow = false
    chart = [];
    chart2 = [];
    constructor(private CryptoData:CrytoData, private API:backendRoutes){

    }
    graphSwitch(graphValue){
        if (graphValue === 7){
            this.graph(this.cryptoData.weeklyGraphInfo);
            this.Title = "7-Days";
        } else if (graphValue === 30){
            this.graph(this.cryptoData.monthlyGraphInfo);
            this.Title = "30-Days";
        } else if (graphValue === 40){
            this.graph(this.cryptoData.maxPast);
            this.Title = "40-Days";
        }
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
        let admin = sessionStorage.getItem("username");
        if (admin) {
            this.allowedFollow = true;
        }
        let pricesARRY;
        let dateARRY;
        let newDATES = [];

        this.CryptoData.getCryptoWeek(searchItem).subscribe((res) => {
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
            this.cryptoData = {
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
            }
            this.graph(this.cryptoData.weeklyGraphInfo);
        }
        })
    }
    followDetails(searchItem){
        this.followBox = true;
        this.addingCrypto = searchItem
    }
    handleFollow(notes){
        console.log( typeof this.addingCrypto);
        let CRYPTO = {
            crypto_name: this.addingCrypto,
            notes: notes['notesInput'],
            admin: sessionStorage.getItem('username')
        }
        this.API.followCrypto(CRYPTO).subscribe((res => {
            if(res['err']){
                window.alert(CRYPTO.crypto_name + " has already been followed");
                this.addingCrypto = '';
                this.followBox = false;
            } else {
                window.location.href = '/src/stocks';
                this.addingCrypto = '';
                this.followBox = false;
            }
        }))
    }
}