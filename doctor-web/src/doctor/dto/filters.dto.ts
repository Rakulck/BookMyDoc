import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDecimal, IsOptional, IsString } from 'class-validator';

export class DoctorFilterDto {
  @ApiPropertyOptional({
    description: 'Search By doctor name or expertise',
    example: 'doctor x',
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    description: 'The name of the doctor',
    example: 'doctor x',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'The service of the doctor',
    example: 'service x',
  })
  @IsString()
  @IsOptional()
  service?: string;

  @ApiPropertyOptional({
    description: 'The expertise of the doctor',
    example: 'expertise x',
  })
  @IsString()
  @IsOptional()
  expertise?: string;

  @ApiPropertyOptional({
    description: 'The availability of the doctor',
    example: 10,
  })
  @IsBoolean()
  @Transform(({ value }) => ['true', 'false'].includes(value))
  @IsOptional()
  availability?: boolean;

  @ApiPropertyOptional({
    description: 'The limit of the doctor',
    example: 10,
  })
  @IsDecimal()
  @IsOptional()
  limit?: number;
}
