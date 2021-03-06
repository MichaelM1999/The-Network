import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
//meta app imports
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
// Components
import { Crypto } from '../components/Crypto/crypto';
import { Dashboard } from '../components/Dashboard/dashboard';
import { Navbar } from '../components/navbar/navbar';
import { Stocks } from '../components/Stocks/stocks';
import { Graph } from '../components/graphs/graphs';
import { AdminLogin } from '../components/adminLogin/adminLogin';
import { StockThumbnailComponent } from '../components/Stocks/stock-thumbnail';
import { StockDetailsComponent } from '../components/StockDetails/stockdetail';
import { CryptoWL } from '../components/cryptoWL/cryptoWL';
import { CryptoThumbnailComponent } from '../components/cryptoWL/crypto-thumbnail';
import { CryptoDetailsComponent } from '../components/CryptoDetails/cryptoDetails';
//injectables
import { StockData } from '../injectables/stockdata';
import { CrytoData } from '../injectables/Cryptodata';
import  { backendRoutes } from '../injectables/backendRoutes';

@NgModule({
  declarations: [
    AppComponent,
    Crypto,
    Dashboard,
    Navbar,
    Stocks,
    Graph,
    AdminLogin,
    StockThumbnailComponent,
    StockDetailsComponent,
    CryptoWL,
    CryptoThumbnailComponent,
    CryptoDetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    StockData,
    CrytoData,
    backendRoutes,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
