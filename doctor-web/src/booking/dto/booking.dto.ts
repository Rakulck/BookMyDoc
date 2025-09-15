import { IBookingStatus } from '../type';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AvailabilitySlot } from '@app/availability/dto/availability.dto';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { ProfileDto } from '@app/profile/dto/profile.dto';
import { PaymentDto } from './payment.dto';
import { ReviewDto } from './review.dto';

export class ServiceDto {
  @ApiProperty({ description: 'The ID of the service', example: 'serv123' })
  service_id: string;

  @ApiProperty({
    description: 'The name of the service',
    example: 'Consultation',
  })
  name: string;

  @ApiProperty({
    description: 'The description of the service',
    example: 'Consultation with doctor',
  })
  description: string;

  @ApiProperty({ description: 'The type of the service', example: 'General' })
  type: string;

  @ApiProperty({ description: 'The price of the service', example: 100 })
  price: number | string;
}

export class BookingDto {
  @ApiProperty({ description: 'The ID of the booking', example: 'booking123' })
  booking_id: string;

  @ApiProperty({ description: 'The ID of the customer', example: 'cust456' })
  customer_id: string;

  @ApiProperty({ description: 'The ID of the doctor', example: 'doc789' })
  doctor_id: string;

  @ApiProperty({ description: 'The ID of the service', example: 'ser589' })
  service_id: string;

  @ApiProperty({ description: 'The ID of the time slot', example: 'slot389' })
  slot_id: string;

  @ApiProperty({
    description: 'The status of the booking',
    enum: IBookingStatus,
  })
  status: IBookingStatus;

  @ApiProperty({
    description: 'The date of the booking',
    example: '2024-09-09',
  })
  date: string;

  @ApiPropertyOptional({
    type: ProfileDto,
    description: 'The customer info of the booking',
  })
  customer: ProfileDto;

  @ApiPropertyOptional({
    type: ProfileDto,
    description: 'The doctor info of the booking',
  })
  doctor: ProfileDto;

  @ApiPropertyOptional({
    type: ServiceDto,
    description: 'The service of the booking',
  })
  service: ServiceDto;

  @ApiProperty({
    type: AvailabilitySlot,
    description: 'The slot of the booking',
  })
  slot: AvailabilitySlot;

  @ApiPropertyOptional({
    type: PaymentDto,
    description: 'The payment of the booking',
  })
  payment: PaymentDto;

  @ApiPropertyOptional({ description: 'The review of the booking' })
  review: ReviewDto;

  @ApiPropertyOptional({ description: 'The history of the booking' })
  history: Record<string, any>;

  @ApiProperty({
    description: 'The creation date of the booking',
    example: '2024-09-01T12:00:00Z',
  })
  created_at: string;

  @ApiPropertyOptional({
    description: 'The last update date of the booking',
    example: '2024-09-02T12:00:00Z',
  })
  updated_at?: string;
}

export class BookingCreateDto {
  @ApiProperty({ description: 'The ID of the customer', example: 'cust456' })
  @IsString()
  @IsOptional()
  customer_id: string;

  @ApiProperty({ description: 'The ID of the doctor', example: 'doc789' })
  @IsString()
  @IsNotEmpty()
  doctor_id: string;

  @ApiProperty({ description: 'The ID of the service', example: 'ser589' })
  @IsString()
  @IsNotEmpty()
  service_id: string;

  @ApiProperty({ description: 'The ID of the time slot', example: 'slot389' })
  @IsString()
  @IsNotEmpty()
  slot_id: string;

  @ApiProperty({
    description: 'The date of the booking',
    example: '2024-09-09',
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiPropertyOptional({ type: PaymentDto })
  @IsOptional()
  payment: PaymentDto;

  @ApiPropertyOptional({
    description: 'The creation date of the booking',
    example: '2024-09-01T12:00:00Z',
  })
  @IsDateString()
  @IsOptional()
  created_at?: string;
}

export class BookingUpdateDto {
  @ApiProperty({ description: 'The ID of the customer', example: 'cust456' })
  @IsString()
  @IsOptional()
  customer_id: string;

  @ApiProperty({ description: 'The ID of the doctor', example: 'doc789' })
  @IsString()
  @IsOptional()
  doctor_id: string;

  @ApiProperty({ description: 'The ID of the service', example: 'ser589' })
  @IsString()
  @IsOptional()
  service_id: string;

  @ApiProperty({ description: 'The ID of the time slot', example: 'slot389' })
  @IsString()
  @IsOptional()
  slot_id: string;

  @ApiProperty({
    description: 'The status of the booking',
    enum: IBookingStatus,
  })
  @IsEnum(IBookingStatus)
  @IsString()
  @ValidateIf((o) => 'status' in o)
  status: IBookingStatus;

  @ApiProperty({
    description: 'The date of the booking',
    example: '2024-09-09',
  })
  @IsDateString()
  @IsNotEmpty()
  @ValidateIf((o) => 'date' in o)
  date: string;

  @ApiPropertyOptional({ type: PaymentDto })
  @IsOptional()
  payment: PaymentDto;

  @ApiPropertyOptional({
    description: 'The creation date of the booking',
    example: '2024-09-01T12:00:00Z',
  })
  @IsDateString()
  @IsOptional()
  created_at?: string;

  @ApiPropertyOptional({
    description: 'The last update date of the booking',
    example: '2024-09-02T12:00:00Z',
  })
  @IsDateString()
  @IsOptional()
  updated_at?: string;
}
