import {Result} from './result';

export class ChartData {
  constructor(
    public results?: Result[],
    public title?:string,
    private datasets?: DataSet[],
    private labels?: string[],
  ) {
    if (results != null) {
      this.datasets =
        [{
          data: this.results.map((top) => top.cases),
          backgroundColor: [
            '#000000',
            '#4D4D4D',
            '#5DA5DA',
            '#FAA43A',
            '#60BD68',
            '#F17CB0',
            '#B2912F',
            '#B276B2',
            '#DECF3F',
            '#F15854'
          ],
          label: title
        }];
    }
    this.labels = results.map((top) => top.country);
  }
}


export class DataSet {
  constructor(
    public data: number[],
    public backgroundColor: string[],
    public label: string

  ) {

  }
}
