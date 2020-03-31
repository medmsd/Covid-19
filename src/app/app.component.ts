import {Component, OnInit} from '@angular/core';
import {CovidService} from './services/covid.service';
import {Result} from './models/result';
import {World} from './models/world';
import {ChartData} from './models/chart-data';
import {concatMap, expand} from 'rxjs/operators';
import {timer} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Covid';
  private cols: any[];
  private results: Result[];
  private global: World;
  private todayDeaths: Result[];
  private todayCases: Result[];
  private data: ChartData;
  private top10: Result[];
  private repeateRate=20;
  private options:any;

  constructor(private covidService: CovidService) {
  }

  ngOnInit(): void {
    this.options = {
      legend: {
        display:false
      }
    };
    this.cols = [
      {field: 'country', header: 'Country'},
      {field: 'cases', header: 'Cases'},
      {field: 'deaths', header: 'Deaths'},
      {field: 'recovered', header: 'Recovered'},
      {field: 'todayDeaths', header: 'Today Deaths'},
      {field: 'todayCases', header: 'Today Cases'},
    ];
    this.covidService.getWorldData().pipe(
      expand(_ => timer(this.repeateRate*1000).pipe(concatMap(_ => this.covidService.getWorldData())))).subscribe((global) => {
      this.global = global;
    });
    this.covidService.getAllData().pipe(
      expand(_ => timer(this.repeateRate*1000).pipe(concatMap(_ => this.covidService.getAllData())))).subscribe((data) => {
      this.results = data;
      this.top10 = data.slice(0, 10);
      this.data = new ChartData(this.top10, 'Top 10 cases');

    });
    this.covidService.getAllDataByTodayDeaths().pipe(
      expand(_ => timer(this.repeateRate*1000).pipe(concatMap(_ => this.covidService.getAllDataByTodayDeaths())))).subscribe((data) => {
      this.todayDeaths = data.slice(0, 10);
    });
    this.covidService.getAllDataByTodayCases().pipe(
      expand(_ => timer(this.repeateRate*1000).pipe(concatMap(_ => this.covidService.getAllDataByTodayCases())))).subscribe((data) => {
      this.todayCases = data.slice(0, 10);
    });
  }

  get loaded() {
    return this.global != null && this.results != null && this.todayDeaths != null && this.todayCases != null;
  }

}
