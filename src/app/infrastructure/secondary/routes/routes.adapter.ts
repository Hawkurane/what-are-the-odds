import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Routes } from 'src/app/domain/port/routes.interface';
import { Travel } from 'src/app/domain/travel';
import { Repository } from 'typeorm';
import { RouteEntity } from './entity/route.entity';

@Injectable()
export class RoutesAdapter implements Routes {
  constructor(
    @InjectRepository(RouteEntity)
    private routeRepository: Repository<RouteEntity>,
  ) {}

  getAllTravels(): Promise<Travel[]> {
    return this.routeRepository
      .find()
      .then((routeEntities) => routeEntities.map((e) => this.toDomain(e)));
  }

  async getTravelTime(source: string, destination: string): Promise<number> {
    return this.routeRepository
      .findOneBy({
        origin: source,
        destination: destination,
      })
      .then((value) => value!.travel_time);
  }

  private toDomain(entity: RouteEntity): Travel {
    return new Travel(entity.origin, entity.destination, entity.travel_time);
  }
}
