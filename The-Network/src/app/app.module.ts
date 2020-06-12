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

@NgModule({
  declarations: [
    AppComponent,
    Crypto,
    Dashboard,
    Navbar,
    Stocks,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
