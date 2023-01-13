import * as fs from 'fs';
import { Command, CommandRunner } from 'nest-commander';
import { BountyHunter, Empire } from 'src/app/domain/empire-patrol';
import { MilleniumFalcon } from 'src/app/domain/millenium-falcon';
import { OddsApplicationService } from '../../application/app.service';

@Command({
  name: 'give-me-the-odds',
  description: 'Calculates odds of given millenium falcon ship to be caught by the given empire patrol routes',
})
export class OddsCommand extends CommandRunner {
  constructor(private readonly oddsApplicationService: OddsApplicationService) {
    super();
  }

  async run(passedParam: string[]): Promise<void> {
    if (passedParam.length !== 2) {
      console.error('Expected two parameters but got ' + passedParam.length);
      return;
    }
    const arg1: string = passedParam[0];
    const arg2: string = passedParam[1];

    const milleniumFalcon: MilleniumFalcon = this.importMilleniumFalcon(arg1);
    const empire: Empire = this.importEmpire(arg2);

    const odds: number = await this.oddsApplicationService.getOddsWithMillenium(milleniumFalcon, empire);

    console.log(odds);
  }

  private importEmpire(path: string): Empire {
    const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
    return new Empire(
      data.countdown,
      data.bounty_hunters.map((el: any) => this.mapBountyHunters(el)),
    );
  }

  private mapBountyHunters(e: any): BountyHunter {
    return new BountyHunter(e.planet, e.day);
  }

  private importMilleniumFalcon(path: string): MilleniumFalcon {
    const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
    return new MilleniumFalcon(data.autonomy, data.departure, data.arrival);
  }
}
