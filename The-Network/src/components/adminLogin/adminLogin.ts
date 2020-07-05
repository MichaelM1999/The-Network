import { Component } from '@angular/core';
import { backendRoutes } from '../../injectables/backendRoutes';

@Component ({
    selector:"AdminLogin",
    templateUrl:'./adminLogin.html',
    styleUrls:['./adminLogin.scss']
})
export class AdminLogin {
constructor(private API:backendRoutes){

}

    handleLogin(adminLogin){
        console.log(adminLogin);
        this.API.loginRoute(adminLogin).subscribe((res => {
            if (res === 'Approved') {
                sessionStorage.setItem('username', adminLogin.username);
                window.location.href = '/src/dashboard';
            } else if (res === 'Denied') {
                window.alert("incorrect Admin Password");
            }
        }))

    }
}