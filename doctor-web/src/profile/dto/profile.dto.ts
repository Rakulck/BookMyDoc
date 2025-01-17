import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsArray,
  IsNumber,
  IsDecimal,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import { AddressDto } from './address.dto';
import { Transform, Type } from 'class-transformer';

export class ProfileDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Display name of the profile' })
  display_name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'User name of the profile' })
  user_name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Email of the profile' })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Stripe customer id of the profile' })
  stripe_id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Role of the profile' })
  role?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Phone of the profile' })
  phone?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Title of the profile' })
  title?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Bio of the profile' })
  bio?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Gender of the profile' })
  gender?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Age of the profile' })
  age?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Experience of the profile' })
  experience?: string;

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    description: 'Expertise of the profile',
    type: [String],
  })
  expertiseList?: string[]; // Specify the type inside the array

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    description: 'Services of the profile',
    type: [String],
  })
  services?: string[]; // Specify the type inside the array

  @IsOptional()
  // @ValidateNested()
  @Type(() => AddressDto) // Ensure class-transformer is installed and used
  @ApiPropertyOptional({
    description: 'The address information of the location',
    type: AddressDto,
  })
  location?: AddressDto;

  @IsDecimal()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Height of the profile' })
  height?: number;

  @IsDecimal()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Weight of the profile' })
  weight?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Blood group of the profile' })
  blood_group?: string;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Date of birth of the profile' })
  dob?: string;

  @IsBoolean()
  @Transform((params) => {
    return ![false, 'false', 'False'].includes(String(params?.value));
  })
  @IsOptional()
  @ApiPropertyOptional({ description: 'Notification settings of the profile' })
  notification_enabled?: boolean;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Notification settings of the profile' })
  notification_tokens?: any;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'CreatedAt timestamp' })
  createdAt?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'UpdatedAt timestamp' })
  updatedAt?: string;
}
