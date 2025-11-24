import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  // Server
  PORT: z.string().default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Database
  DATABASE_URL: z.string(),

  // JWT
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('7d'),
  JWT_REFRESH_SECRET: z.string(),
  JWT_REFRESH_EXPIRES_IN: z.string().default('30d'),

  // Redis
  REDIS_URL: z.string().default('redis://localhost:6379'),
  REDIS_PASSWORD: z.string().optional(),

  // AWS S3
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_S3_BUCKET: z.string().optional(),
  AWS_REGION: z.string().default('us-east-1'),

  // CORS
  ALLOWED_ORIGINS: z.string().default('http://localhost:3000'),

  // File Upload
  MAX_FILE_SIZE: z.string().default('10485760'),
  MAX_IMAGE_SIZE: z.string().default('5242880'),
  MAX_VIDEO_SIZE: z.string().default('52428800'),

  // Encryption
  ENCRYPTION_KEY: z.string().optional(),
});

const env = envSchema.parse(process.env);

export const config = {
  server: {
    port: parseInt(env.PORT, 10),
    nodeEnv: env.NODE_ENV,
  },
  database: {
    url: env.DATABASE_URL,
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
    refreshSecret: env.JWT_REFRESH_SECRET,
    refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
  },
  redis: {
    url: env.REDIS_URL,
    password: env.REDIS_PASSWORD,
  },
  aws: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    s3Bucket: env.AWS_S3_BUCKET,
    region: env.AWS_REGION,
  },
  cors: {
    allowedOrigins: env.ALLOWED_ORIGINS.split(','),
  },
  upload: {
    maxFileSize: parseInt(env.MAX_FILE_SIZE, 10),
    maxImageSize: parseInt(env.MAX_IMAGE_SIZE, 10),
    maxVideoSize: parseInt(env.MAX_VIDEO_SIZE, 10),
  },
  encryption: {
    key: env.ENCRYPTION_KEY || '',
  },
};

export default config;
