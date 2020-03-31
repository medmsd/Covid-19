import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Result} from '../models/result';
import {World} from '../models/world';
import {repeat} from 'rxjs/operators';

const COUNTRIES = 'https://corona.lmao.ninja/countries';
const WORLD = 'https://corona.lmao.ninja/all';
const CODES = 'assets/CountriesCodes.json';
@Injectable({
  providedIn: 'root'
})
export class CovidService {

  private repeateRate: number = 10;
  constructor(private http:HttpClient) {

  }

  getAllData(): Observable<Result[]> {
    return this.http.get<Result[]>(COUNTRIES);
  }

  getAllDataByTodayDeaths():Observable<Result[]>{
    return this.http.get<Result[]>(COUNTRIES + '?sort=todayDeaths')
  }
  getAllDataByTodayCases():Observable<Result[]>{
    return this.http.get<Result[]>(COUNTRIES + '?sort=todayCases');
  }

  getWorldData():Observable<World>{
    return this.http.get<World>(WORLD);
  }


}
