import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Settings')
@ApiBearerAuth()
@Controller('settings')
@UseGuards(JwtAuthGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('general')
  getGeneral() {
    return this.settingsService.getGeneral();
  }

  @Patch('general')
  updateGeneral(@Body() body: any) {
    return this.settingsService.updateGeneral(body);
  }

  @Get('sms')
  getSms() {
    return this.settingsService.getSms();
  }

  @Patch('sms')
  updateSms(@Body() body: any) {
    return this.settingsService.updateSms(body);
  }

  @Get('voip')
  getVoip() {
    return this.settingsService.getVoip();
  }

  @Patch('voip')
  updateVoip(@Body() body: any) {
    return this.settingsService.updateVoip(body);
  }
}
