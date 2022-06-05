import { Component, OnInit } from '@angular/core';
import {WordsService} from "../../services/words.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  constructor(private wordsService: WordsService) { }

  ngOnInit(): void {
  }

  get seconds() {
    return  this.wordsService.seconds
  }

}
