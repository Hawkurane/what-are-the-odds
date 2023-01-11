import { Assert } from './validator/assert';

export class Path {
  private departure: string;
  private arrival: string;
  private travelLog: string[];

  constructor(departure: string, arrival: string) {
    Assert.notBlank('departure', departure);
    this.departure = departure;
    Assert.notBlank('arrival', arrival);
    this.arrival = arrival;
  }
}
