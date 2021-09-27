module.exports = [
  {
    name: 'default',
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/*.entity.js'],
    migrationsTableName: 'migrations',
    synchronize: false,
    migrations: ['dist/shared/database/migrations/*.js'],
    cli: {
      migrationsDir: 'src/shared/database/migrations',
      entitiesDir: ['src/**/*.entity.ts'],
    },
  },
];
