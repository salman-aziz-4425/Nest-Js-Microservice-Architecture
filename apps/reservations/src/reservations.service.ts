import { Inject, Injectable } from '@nestjs/common';
import { NOTIFICATIONS_SERVICE } from '@app/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationRepository,
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  create(createReservationDto: CreateReservationDto) {
    return this.reservationsRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId: '123',
    });
  }

  async findAll() {
    const configService = new ConfigService();
    this.notificationsService.emit('notify_email', {
      email: 'salmanaziz216@gmail.com',
    });
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
