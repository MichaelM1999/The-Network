import { Routes } from '@angular/router';
import { Dashboard } from '../components/Dashboard/dashboard';
import { Stocks } from '../components/Stocks/stocks';
import { Crypto } from '../components/Crypto/crypto';

export const appRoutes:Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: Dashboard },
    { path: 'crypto', component: Crypto },
    { path: 'stocks', component: Stocks },
]