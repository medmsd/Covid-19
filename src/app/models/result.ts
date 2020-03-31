export class Result {
  constructor(
    public country: string,
    public countryInfo: CountryInfo,
    public cases: number,
    public todayCases: number,
    public deaths: number,
    public todayDeaths: number,
    public recovered: number,
    public active: number,
    public critical: number,
    public casesPerOneMillion: number,
    public deathsPerOneMillion: number,
    public updated: number,
  ) {
  }

}

export class CountryInfo {
  constructor(
    public _id: number,
    public iso2: string,
    public iso3: string,
    public lat: number,
    public long: number,
    public flag: string
  ) {
  }
}
