import { Assert } from './validator/assert';

export class Travel {
  readonly departure: string;
  readonly destination: string;
  readonly travelTime: number;

  constructor(departure: string, destination: string, travelTime: number) {
    Assert.notBlank('departure', departure);
    this.departure = departure;

    Assert.notBlank('destination', destination);
    this.destination = destination;

    Assert.thatInteger('travelTime', travelTime).min(1);
    this.travelTime = travelTime;
  }
}
