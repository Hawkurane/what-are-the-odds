export interface EmpireDTO {
  readonly countdown: number;
  readonly bounty_hunters: BountyHunterDTO[];
}

export interface BountyHunterDTO {
  readonly planet: string;
  day: number;
}
