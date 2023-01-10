import { Inject } from '@nestjs/common';
import { Empire } from '../empire-patrol';
import { MilleniumFalcon } from '../millenium-falcon';
import { Pathfinder } from '../port/pathfinder.interface';
import { Routes } from '../port/routes.interface';
import { Travel } from '../travel';

export class OddsDomainService {
  constructor(
    @Inject(Routes) private readonly routes: Routes,
    @Inject(Pathfinder) private readonly pathfinder: Pathfinder,
  ) {}

  async getOddsForEmpirePatrol(
    milleniumFalcon: MilleniumFalcon,
    empire: Empire,
  ): Promise<number> {
    const planets: string[] = await this.getAllPlanets();
    const travels: Travel[] = await this.routes.getAllTravels();
    const allPossiblePaths: string[][] = this.pathfinder.getAllPaths(
      milleniumFalcon.departure,
      milleniumFalcon.arrival,
      planets,
      travels,
    );
    const allPossibleDailyLogs: string[][] = [];
    for (const path of allPossiblePaths)
      allPossibleDailyLogs.push(
        await this.getDailyTravelLog(milleniumFalcon, path),
      );

    const allPossibleOddsFromDailyLogs: number[] = [];
    for (const dailyLog of allPossibleDailyLogs)
      allPossibleOddsFromDailyLogs.push(
        this.getOddsForSpecificPath(dailyLog, empire),
      );
    return new Promise((resolves) => {
      resolves(Math.max(...allPossibleOddsFromDailyLogs));
    });
  }

  getOddsForSpecificPath(path: string[], empire: Empire): number {
    if (path.length === 0 || path.length > empire.countdown) return 0;
    let nbOfTimesRebelsMeetEmpire = 0;
    for (const planetPatrol of empire.bountyHunters)
      if (path[planetPatrol.day - 1] === planetPatrol.planet)
        nbOfTimesRebelsMeetEmpire++;
    return this.getProbabilityFromEncounters(nbOfTimesRebelsMeetEmpire);
  }

  private getProbabilityFromEncounters(times: number): number {
    let sum = 0.0;
    for (let i = 0; i < times; i++) {
      sum += Math.pow(9, i) / Math.pow(10, i + 1);
    }
    return 100 - sum * 100;
  }

  async getDailyTravelLog(
    milleniumFalcon: MilleniumFalcon,
    path: string[],
  ): Promise<string[]> {
    let position: string = milleniumFalcon.departure;
    const travelLog: string[] = [position];
    let day = 1;
    let milleniumFalconBattery = milleniumFalcon.autonomy;
    while (position !== milleniumFalcon.arrival) {
      const travelTimeToNextPlanet: number = await this.routes.getTravelTime(
        path[day - 1],
        path[day],
      );
      if (milleniumFalconBattery < travelTimeToNextPlanet) {
        travelLog.push(position);
        milleniumFalconBattery = milleniumFalcon.autonomy;
      } else {
        for (let j = 0; j < travelTimeToNextPlanet - 2; j++)
          travelLog.push('Hyperspace');
        milleniumFalconBattery -= travelTimeToNextPlanet;
        position = path[day];
        travelLog.push(position);
        day++;
      }
    }
    return new Promise((resolve) => {
      resolve(travelLog);
    });
  }

  async getAllPlanets(): Promise<string[]> {
    const planets: Set<string> = new Set<string>();
    const travels: Travel[] = await this.routes.getAllTravels();
    travels.forEach((travel) => {
      planets.add(travel.departure).add(travel.destination);
    });
    return new Promise((resolve) => {
      resolve(Array.from(planets));
    });
  }
}
