import { Component } from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
})
export class Error404Component {

  constructor() { }

  goBack(){
    window.history.back();
  }
}
