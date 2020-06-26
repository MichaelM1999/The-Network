import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'crypto-thumbnail',
    templateUrl: './crypto-thumbnail.html'
})
export class CryptoThumbnailComponent implements OnInit{
    @Input() Crypto:any
    cryptoinfo:any
    admin: boolean
    ngOnInit(){
        if (sessionStorage.getItem('username')){
            this.admin = true;
        }
        else {
            this.admin = false;
        }
    }
}