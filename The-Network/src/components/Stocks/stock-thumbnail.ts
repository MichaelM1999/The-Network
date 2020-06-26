import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'stock-thumbnail',
    templateUrl: './stock-thumbnail.html'
})
export class StockThumbnailComponent implements OnInit{
    @Input() Stock:any
    stockinfo:any
    ngOnInit(){
    
    }
}