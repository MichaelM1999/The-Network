import { Routes } from '@angular/router';
import { Dashboard } from '../components/Dashboard/dashboard';
import { Stocks } from '../components/Stocks/stocks';
import { Crypto } from '../components/Crypto/crypto';
import { Graph } from '../components/graphs/graphs';
import { AdminLogin } from '../components/adminLogin/adminLogin';
import { StockDetailsComponent } from '../components/StockDetails/stockdetail';

export const appRoutes:Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: Dashboard },
    { path: 'crypto', component: Crypto },
    { path: 'stocks', component: Stocks },
    { path: 'stocks/:name', component: StockDetailsComponent},
    { path: 'searchStocks', component: Graph },
    { path: 'login', component: AdminLogin },
]