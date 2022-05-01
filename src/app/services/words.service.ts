import { Injectable } from '@angular/core';
import {catchError, Observable} from "rxjs";
import {Length} from "../models/length";
import {HttpClient} from "@angular/common/http";
import {WordStatus} from "../models/word-status";

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  private readonly url: string = 'http://127.0.0.1:8080/WordleServer-1.0-SNAPSHOT/api/words/'

  constructor(private http: HttpClient) { }

  get length(): Observable<Length> {
    return this.http.get<Length>(this.url+'length')
  }

   getWordStatus(value: string): Observable<WordStatus> {
    return this.http.post<WordStatus>(this.url, {value})
  }
}
