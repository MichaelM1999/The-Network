import { Routes } from '@angular/router';
import { Dashboard } from '../components/Dashboard/dashboard';
import { Stocks } from '../components/Stocks/stocks';
import { Crypto } from '../components/Crypto/crypto';
import { Graph } from '../components/graphs/graphs';
import { CryptoWL } from '../components/cryptoWL/cryptoWL';
import { AdminLogin } from '../components/adminLogin/adminLogin';
import { StockDetailsComponent } from '../components/StockDetails/stockdetail';
import { CryptoDetailsComponent } from '../components/CryptoDetails/cryptoDetails';


export const appRoutes:Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: Dashboard },
    { path: 'stocks', component: Stocks },
    { path: 'crypto', component: CryptoWL },
    { path: 'stocks/:name', component: StockDetailsComponent},
    { path: 'cryptos/:name', component: CryptoDetailsComponent },
    { path: 'cryptoSearch', component: Crypto },
    { path: 'searchStocks', component: Graph },
    { path: 'login', component: AdminLogin },
]