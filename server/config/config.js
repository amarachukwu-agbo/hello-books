const config = {
  development: {
    username: 'postgres',
    password: 'triumph22',
    database: 'HelloBooks-dev',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'triumph22',
    database: 'hellobooks_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  },
};
export default config;
