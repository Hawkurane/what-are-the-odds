import { Assert } from './validator/assert';

export class Empire {
  readonly countdown: number;
  readonly bountyHunters: BountyHunter[];

  constructor(countdown: number, bountyHunters: BountyHunter[]) {
    Assert.thatInteger('countdown', countdown).min(1);
    this.countdown = countdown;
    this.bountyHunters = bountyHunters;
  }
}

export class BountyHunter {
  readonly planet: string;
  readonly day: number;

  constructor(planet: string, day: number) {
    Assert.notBlank('planet', planet);
    this.planet = planet;

    Assert.thatInteger('day', day).min(0);
    this.day = day;
  }
}
