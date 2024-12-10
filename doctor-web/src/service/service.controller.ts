import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceDto } from './dto/create-service.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RolesGuard } from '../auth/guard/roles.guard';

@Controller('service')
@ApiBearerAuth()
@ApiTags('service')
@UseGuards(RolesGuard)
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch Services for doctor' })
  @ApiResponse({
    status: 200,
    description: 'Services fetched successfully.',
    type: [ServiceDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  findAll() {
    return this.serviceService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create Service' })
  @ApiResponse({
    status: 200,
    description: 'Service created successfully.',
    type: ServiceDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  create(@Body() createServiceDto: ServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @ApiOperation({ summary: 'Delete Service' })
  @ApiResponse({
    status: 200,
    description: 'Service deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}
