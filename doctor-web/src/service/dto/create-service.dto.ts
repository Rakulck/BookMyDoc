import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class ServiceDto {
  @ApiProperty({
    description: 'Name of the service',
    example: 'Consultation',
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @ApiProperty({
    description: 'Description of the service',
    example:
      'A detailed consultation service including initial assessment and follow-up.',
  })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @ApiProperty({
    description: 'Type of the service',
    example: 'Medical',
  })
  @IsString({ message: 'Type must be a string' })
  @IsNotEmpty({ message: 'Type cannot be empty' })
  type: string;

  @ApiProperty({
    description: 'Price amount for the service',
    example: 150.0,
  })
  @IsNumber({}, { message: 'Price amount must be a number' })
  @IsNotEmpty({ message: 'Price amount cannot be empty' })
  price_amount: number;

  @ApiProperty({
    description: 'Icon for the service',
    example: 'medical-outline',
  })
  @IsString({ message: 'Icon name must be a string' })
  @IsNotEmpty({ message: 'Icon name cannot be empty' })
  icon_name: string;
}
