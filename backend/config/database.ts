import path from 'path';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'mysql');

  const useSSL = env.bool('DATABASE_SSL', false);

  return {
    connection: {
      client,
      connection: {
        host: env('DATABASE_HOST'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME'),
        user: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),

        ...(useSSL ? { ssl: { rejectUnauthorized: false } } : {}),

        charset: 'utf8mb4',
      },
      pool: {
        min: 0,
        max: 3,
      },
      acquireConnectionTimeout: 60000,
    },
  };
};
