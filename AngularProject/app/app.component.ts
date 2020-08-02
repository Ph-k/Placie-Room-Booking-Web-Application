import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular';

  logged = false;
  username = 'KOUROUPETOGLOU';

  GoToRegister(){
    //window.location.href = '/register.component.html';

  }
}
