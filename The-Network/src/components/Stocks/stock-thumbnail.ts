import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'stock-thumbnail',
    templateUrl: './stock-thumbnail.html',
    styleUrls: ['./stock-thumbnail.scss'],
})
export class StockThumbnailComponent implements OnInit{
    @Input() Stock:any
    stockinfo:any
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