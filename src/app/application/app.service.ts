import { Injectable } from '@nestjs/common';
import * as millenium_falcon from 'resources/millenium-falcon.json';
import { Empire } from '../domain/empire-patrol';
import { MilleniumFalcon } from '../domain/millenium-falcon';
import { OddsDomainService } from '../domain/service/odds.service';
@Injectable()
export class OddsApplicationService {
  constructor(private readonly oddsDomainService: OddsDomainService) {}

  getOdds(empire: Empire): Promise<number> {
    const milleniumFalcon: MilleniumFalcon = new MilleniumFalcon(
      millenium_falcon.autonomy,
      millenium_falcon.departure,
      millenium_falcon.arrival,
    );
    return this.oddsDomainService.getOddsForEmpirePatrol(
      milleniumFalcon,
      empire,
    );
  }
}
