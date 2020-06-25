import { Component } from '@angular/core';

@Component ({
    selector:"AdminLogin",
    templateUrl:'./adminLogin.html',
    styleUrls:['./adminLogin.scss']
})
export class AdminLogin {


    handleLogin(adminLogin){
        console.log(adminLogin);
        sessionStorage.setItem('username', adminLogin.username);
        window.location.href = '/src/dashboard';
    }
}