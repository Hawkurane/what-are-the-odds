import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { BountyHunter, Empire } from 'src/app/domain/empire-patrol';
import { OddsApplicationService } from '../../application/app.service';
import { BountyHunterDTO, EmpireDTO } from './empire.dto';

@Controller()
export class OddsController {
  constructor(private readonly oddsApplicationService: OddsApplicationService) {}

  @Post('odds')
  @HttpCode(226)
  getOdds(@Body() empire: EmpireDTO): Promise<number> {
    return this.oddsApplicationService.getOdds(this.toEmpireDomain(empire));
  }

  private toEmpireDomain(dto: EmpireDTO): Empire {
    return new Empire(
      dto.countdown,
      dto.bounty_hunters.map((bh) => this.toBountyHunterDomain(bh)),
    );
  }

  private toBountyHunterDomain(dto: BountyHunterDTO): BountyHunter {
    return new BountyHunter(dto.planet, dto.day);
  }
}
