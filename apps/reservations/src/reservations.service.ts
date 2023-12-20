import { Injectable } from '@nestjs/common';

import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationsRepository: ReservationRepository) {}

  create(createReservationDto: CreateReservationDto) {
    return this.reservationsRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId: '123',
    });
  }

  findAll() {
    const configService = new ConfigService();
    console.log(configService.get<string>('MONGODB_URI'));
    return this.reservationsRepository.find({});
  }

  findOne(_id: string) {
    return this.reservationsRepository.findOne({ _id });
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(_id, {
      $set: updateReservationDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
