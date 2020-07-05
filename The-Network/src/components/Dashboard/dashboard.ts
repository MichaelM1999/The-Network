import { Component } from '@angular/core';
import { backendRoutes } from '../../injectables/backendRoutes';

@Component ({
    selector: 'Dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.scss']
}) 
export class Dashboard {
    constructor(private API: backendRoutes ){

    }
}