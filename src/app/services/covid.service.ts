import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Result} from '../models/result';
import {World} from '../models/world';
import {Details} from '../models/details';

const COUNTRIES = 'https://corona.lmao.ninja/v2/countries';
const WORLD = 'https://corona.lmao.ninja/v2/all';
const DETAILS = 'https://api.covid19api.com/total/country/';
const CONFIRMED = '/status/confirmed';
@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private http:HttpClient) {

  }

  getAllData(): Observable<Result[]> {
    return this.http.get<Result[]>(COUNTRIES+"?sort=cases");
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

  getCountryDetails(countryName: string): Observable<Details[]> {
    return this.http.get<Details[]>(DETAILS + countryName + CONFIRMED);
  }
  getCountryData(countryName:string):Observable<Result>{
    return this.http.get<Result>(COUNTRIES + '/' + countryName);
  }


}
