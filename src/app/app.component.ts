import {Component, OnInit, ViewChild} from '@angular/core';
import {CovidService} from './services/covid.service';
import {Result} from './models/result';
import {World} from './models/world';
import {ChartData} from './models/chart-data';
import {concatMap, expand} from 'rxjs/operators';
import {timer} from 'rxjs';
import * as CanvasJS from './canvasjs.min.js';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Covid';
  public cols: any[];
  public results: Result[];
  public global: World;
  public todayDeaths: Result[];
  public todayCases: Result[];
  public data: ChartData;
  public top10: Result[];
  public repeateRate = 20;
  public options: any;
  public dataSource: MatTableDataSource<Result>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private covidService: CovidService) {
  }

  ngOnInit(): void {

    this.options = {
      legend: {
        display: false
      }
    };
    this.cols = ['country', 'cases', 'deaths', 'recovered', 'todayDeaths','todayCases',];
    this.covidService.getWorldData().pipe(
      expand(_ => timer(this.repeateRate * 1000).pipe(concatMap(_ => this.covidService.getWorldData())))).subscribe((global) => {
      this.global = global;
      console.log(global);
    });
    this.covidService.getAllDataByTodayDeaths().pipe(
      expand(_ => timer(this.repeateRate * 1000).pipe(concatMap(_ => this.covidService.getAllDataByTodayDeaths())))).subscribe((data) => {
      this.todayDeaths = data.slice(0, 10);
    });
    this.covidService.getAllDataByTodayCases().pipe(
      expand(_ => timer(this.repeateRate * 1000).pipe(concatMap(_ => this.covidService.getAllDataByTodayCases())))).subscribe((data) => {
      this.todayCases = data.slice(0, 10);
    });
    this.covidService.getAllData().pipe(
      expand(_ => timer(this.repeateRate * 1000).pipe(concatMap(_ => this.covidService.getAllData())))).subscribe((data) => {
      this.results = data;
      this.dataSource = new MatTableDataSource(this.results);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.top10 = data.slice(0, 10);
      this.data = new ChartData(this.top10, 'Top 10 cases');
      this.loadChart();

    });
  }

  get loaded() {
    return this.global != null && this.results != null && this.todayDeaths != null && this.todayCases != null;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadChart() {
    let chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      theme: 'dark1',
      backgroundColor: 'black',
      title: {
        text: 'TOP 10 Countries',
      },
      data: [{
        startAngle: 240,
        indexLabel: '{label} {y}',
        type: 'pie',
        dataPoints: this.top10.map((top) => new DataPoint(top.cases, top.country))
      }]
    });

    chart.render();
  }

}

export class DataPoint {
  constructor(
    public y: number,
    public label: string
  ) {
  }
}
