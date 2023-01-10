import { Assert } from './validator/assert';

export class MilleniumFalcon {
  readonly autonomy: number;
  readonly departure: string;
  readonly arrival: string;

  constructor(autonomy: number, departure: string, arrival: string) {
    Assert.thatInteger('autonomy', autonomy).min(1);
    this.autonomy = autonomy;
    Assert.notBlank('departure', departure);
    this.departure = departure;
    Assert.notBlank('arrival', arrival);
    this.arrival = arrival;
  }
}
