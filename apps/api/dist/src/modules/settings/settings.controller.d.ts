import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getGeneral(): Promise<{
        message: string;
    }>;
    updateGeneral(body: any): Promise<{
        message: string;
    }>;
    getSms(): Promise<{
        message: string;
    }>;
    updateSms(body: any): Promise<{
        message: string;
    }>;
    getVoip(): Promise<{
        message: string;
    }>;
    updateVoip(body: any): Promise<{
        message: string;
    }>;
}
