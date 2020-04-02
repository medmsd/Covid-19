import {Component, OnInit, ViewChild} from '@angular/core';
import {merge, Observable, of} from 'rxjs';
import {Result} from '../../models/result';
import {World} from '../../models/world';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CovidService} from '../../services/covid.service';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public filteredCountries: Observable<CountryFlag[]>;
  public search = new FormControl();
  public countries: CountryFlag[];
  public cols: any[];
  public updateOptions: any;
  public results: Observable<Result[]>;
  public global: Observable<World>;
  public todayDeaths: Observable<Result[]>;
  public todayCases: Observable<Result[]>;
  public dataPoints: DataPoint[]=[];
  public topNumber = 10;
  public options: any;
  public dataSource = new MatTableDataSource<Result>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private covidService: CovidService,private router:Router) {
  }

  ngOnInit(): void {
    this.results = this.covidService.getAllData();
    this.cols = ['country', 'cases', 'deaths', 'recovered', 'todayDeaths','todayCases',];
    this.options = {
      title:{
        text:'Top 10 Countries',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: this.dataPoints.map((dataPoint)=>dataPoint.value)
      },
      series: [
        {
          name: 'Cases',
          type: 'pie',
          radius: [30, 110],
          data: this.dataPoints
        }
      ]
    };
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.covidService!.getAllData()
        }),
        map(data => {
          return data;
        }),
        catchError(() => {
          return of<Result[]>([]);
        })
      ).subscribe(data => {
      this.filteredCountries = this.search.valueChanges
        .pipe(
          startWith(''),
          map(country => country ? this._filteredCountries(country) : this.countries.slice())
        );
      data.slice(0,this.topNumber).forEach((result)=>{
        this.dataPoints.push(new DataPoint(result.cases,result.country));
      })
      this.updateOptions = {
        series: [{
          data: this.dataPoints
        }]
      };
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.countries = data.sort(this.compareName).map((result) => new CountryFlag(result.country, result.countryInfo.flag));
    });
    this.global = this.covidService.getWorldData();
    this.todayDeaths = this.covidService.getAllDataByTodayDeaths();
    this.todayCases = this.covidService.getAllDataByTodayCases();
  }
  private _filteredCountries(value: string): CountryFlag[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(country => country.country.toLowerCase().indexOf(filterValue) === 0);
  }

  compareName(a:Result,b:Result):number{
  if(a.country>b.country)
    return 1;
  if(a.country<b.country)
    return -1;
  return 0;
  }

  get loaded() {
    return this.global != null && this.results != null && this.todayDeaths != null && this.todayCases != null && this.dataPoints.length!=0;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  searchCountry() {
    let countries: string[] = this.dataSource.data.map((result) => result.country);
    if(countries.includes(this.search.value))
    {
      console.log("Exists");
      this.router.navigate(['/stats',this.search.value]);
    }
  }
}

export class DataPoint {
  constructor(
    public value: number,
    public name: string
  ) {
  }
}
export class CountryFlag{
  constructor(
    public country:string,
    public flag:string,
  ) {
  }
}
