import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <Navbar></Navbar>
  <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'The-Network';
}
