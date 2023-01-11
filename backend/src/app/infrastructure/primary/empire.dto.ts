export class EmpireDTO {
  readonly countdown: number;
  readonly bounty_hunters: BountyHunterDTO[];
}

export class BountyHunterDTO {
  readonly planet: string;
  readonly day: number;
}
