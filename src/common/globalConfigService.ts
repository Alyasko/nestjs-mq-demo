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

/**
 * Configuration object for the API.
 */
export let apiConfig: ApiConfig = {
    /**
     * The port number for the API.
     */
    apiPort: parseInt(configService.get<string>('API_PORT')) || 3000,
    /**
     * The host address for the API.
     */
    apiHost: configService.get<string>('API_HOST'),
    /**
     * The host address for the SMTP server.
     */
    smtpHost: configService.get<string>('SMTP_HOST'),
    /**
     * The port number for the SMTP server.
     */
    smtpPort: parseInt(configService.get<string>('SMTP_PORT')),
    /**
     * The name of the email queue.
     */
    emailQueueName: configService.get<string>('EMAIL_QUEUE_NAME'),
    /**
     * The host address for the Redis server.
     */
    redisHost: configService.get<string>('REDIS_HOST'),
    /**
     * The port number for the Redis server.
     */
    redisPort: parseInt(configService.get<string>('REDIS_PORT')) || 6379,
};
