import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('routes')
export class RouteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column()
  travel_time: number;
}
