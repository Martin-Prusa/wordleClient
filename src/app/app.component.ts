import { Component } from '@angular/core';
import {WordsService} from "./services/words.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wordleClient';

  constructor() {
  }

}
