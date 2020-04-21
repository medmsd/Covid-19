import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CovidService} from '../../services/covid.service';
import {Observable} from 'rxjs';
import {Details} from '../../models/details';
import {Result} from '../../models/result';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  public result: Result;
  public countryName: string;
  public data: number[] = [];
  public xAxisData: string[] = [];
  public updateOptions: any;
  public countryFound: boolean = false;
  public loading: boolean = true;

  constructor(private route: ActivatedRoute, private covidService: CovidService) {
  }

  options: any;

  ngOnInit() {
    this.countryName = this.route.snapshot.params['id'];
    this.covidService.getCountryDetails(this.countryName).subscribe((details) => {
      this.loading = false;
      if (details[0] != undefined) {

          details.forEach((detail) => {
            this.data.push(detail.Cases);
            this.xAxisData.push(new Date(detail.Date).toLocaleDateString());
          });
        }
        this.updateOptions = {
          xAxis: {
            data: this.xAxisData
          },
          series: [{
            data: this.data
          }]
        };
    });
    this.covidService.getCountryData(this.countryName).subscribe((res)=>{
      this.loading = false;
      this.countryFound = true;
      this.result=res;
    });

    this.options = {
      tooltip: {},
      xAxis: {
        data: this.xAxisData,
        silent: false,
        splitLine: {
          show: false
        }
      },
      yAxis: {},
      series: [{
        name: 'Cases',
        type: 'line',
        data: this.data,
        animationDelay: function(idx) {
          return idx * 10;
        }
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function(idx) {
        return idx * 5;
      }
    };

  }

}
