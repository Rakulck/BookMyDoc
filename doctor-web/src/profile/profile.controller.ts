import {
  Controller,
  Get,
  Put,
  Body,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/profile.dto';
import { RolesGuard } from '../auth/guard/roles.guard';
import { IApiResponse, IUnsafeObject } from '@common/types';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

@Controller('profile')
@ApiBearerAuth()
@ApiTags('profile')
@UseGuards(RolesGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch profile details' })
  @ApiResponse({
    status: 200,
    description: 'Profile fetched successfully.',
    type: ProfileDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  async getProfile(@Req() req: any): Promise<IApiResponse<IUnsafeObject>> {
    const userId = req.user.uid;
    return this.profileService.getProfile(userId);
  }

  @Put()
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 10 * 1024 * 1024 } }),
  )
  @ApiOperation({ summary: 'Update profile details' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', nullable: true },
        bio: { type: 'string', nullable: true },
        experience: {
          type: 'string',
          nullable: true,
        },
        expertiseList: {
          type: 'array',
          items: { type: 'string' },
          nullable: true,
        },
        file: {
          type: 'string',
          format: 'binary',
          nullable: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully.',
    type: ProfileDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  async updateProfile(
    @Req() req: any,
    @Body() profileDto: ProfileDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<IApiResponse<IUnsafeObject>> {
    const userId = req.user.uid;
    return this.profileService.updateProfile(userId, profileDto, file);
  }
}
