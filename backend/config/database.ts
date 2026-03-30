import path from 'path';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT');

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
        // Destruir conexiones inactivas antes de que Hostinger las cierre (~30s)
        idleTimeoutMillis: 20000,
        // Revisar conexiones muertas cada 10s
        reapIntervalMillis: 10000,
        // Configurar keepalive TCP en cada conexión nueva
        afterCreate: (conn: any, done: Function) => {
          conn.stream?.setKeepAlive?.(true, 10000);
          done(null, conn);
        },
      },
      acquireConnectionTimeout: 60000,
    },
  };
};
