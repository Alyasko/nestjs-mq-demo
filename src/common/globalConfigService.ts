import { ConfigService } from "@nestjs/config";


export interface ApiConfig {
    apiPort: number;
    apiHost: string;
    smtpHost: string;
    smtpPort: number;
    emailQueueName: string;
    redisHost: string;
    redisPort: number;
}

export let configService = new ConfigService();

export let apiConfig: ApiConfig = {
    apiPort: parseInt(configService.get<string>('API_PORT')) || 3000,
    apiHost: configService.get<string>('API_HOST'),
    smtpHost: configService.get<string>('SMTP_HOST'),
    smtpPort: parseInt(configService.get<string>('SMTP_PORT')),
    emailQueueName: configService.get<string>('EMAIL_QUEUE_NAME'),
    redisHost: configService.get<string>('REDIS_HOST'),
    redisPort: parseInt(configService.get<string>('REDIS_PORT')) || 6379,
};
