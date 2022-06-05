import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Length} from "../models/length";
import {HttpClient} from "@angular/common/http";
import {WordStatus} from "../models/word-status";
import {Time} from "../models/time";
import {Line} from "../models/line";
import {LetterStatus} from "../models/letter-status";

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  private readonly url: string = 'http://127.0.0.1:8080/WordleServer-1.0-SNAPSHOT/api/words/'

  private regenerated: Date = new Date()

  public seconds: number = 0

  public lines: Array<Line> = Array<Line>(6)

  public win: boolean = false

  constructor(private http: HttpClient) {
    if (this.isPresent('time') && (this.regenerated.getTime() < new Date(JSON.parse(localStorage.getItem('time')!)).getTime() && this.isPresent('lines'))) {
      this.lines = JSON.parse(localStorage.getItem('lines')!)
      if (this.isPresent('win')) this.win = JSON.parse(localStorage.getItem('win')!)
    } else {
      this.resetLines()
    }
    this.time()
  }

  wordStatus(value: string, index: number) {
    return this.http.post<WordStatus>(this.url, {value}).subscribe(wordStatus => {
      if (!wordStatus.validWord) this.lines[index].classes.fill(LetterStatus.None)
      else this.lines[index].classes = wordStatus.letterStatuses
      this.lines[index].disabled = true
      this.lines[index].badWord = !wordStatus.validWord
      if (wordStatus.winnerWord) {
        this.win = true
        this.disableLines()
        localStorage.setItem("win", JSON.stringify(true))
      }
      localStorage.setItem("lines", JSON.stringify(this.lines))
    })
  }

  private time() {
    this.http.get<Time>(this.url + 'resetAt').subscribe(time => {
      let date = new Date(time.time)
      this.regenerated = date
      localStorage.setItem("time", JSON.stringify(this.regenerated))
      this.seconds = Math.round(date.getTime() / 1000 - new Date().getTime() / 1000)
      console.log(this.seconds)
      const interval = setInterval(() => {
        if (this.seconds === 0) {
          clearInterval(interval)
          this.resetLines()
          setTimeout(() => this.time(), 5000)
        } else {
          this.seconds--
        }
      }, 1000)
    })
  }

  private disableLines() {
    this.lines.forEach(line => line.disabled = true)
  }

  private resetLines() {
    for (let i = 0; i < this.lines.length; i++) {
      this.lines[i] = new Line()
    }
    this.win = false

    localStorage.setItem("lines", JSON.stringify(this.lines))
    localStorage.setItem("win", JSON.stringify(false))
  }

  private isPresent(field: string): boolean {
    return localStorage.getItem(field) !== null && localStorage.getItem(field) !== ''
  }

  get length(): Observable<Length> {
    return this.http.get<Length>(this.url + 'length')
  }
}
