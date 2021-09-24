import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  rmq: {
    host: process.env.RMQ_HOST || 'localhost',
    user: process.env.RMQ_USER || 'guest',
    password: process.env.RMQ_PASSWORD || 'guest',
    port: process.env.RMQ_PORT || 5672,
  },
}));
