module.exports = {
  apps: [
    {
      name: 'prod',
      script: 'index.js',
      instances: 4,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        MONGO_URI:
          'mongodb+srv://varvar:At154872369@cluster0.2bpn6.mongodb.net/clarity?retryWrites=true&w=majority',
        COOKIE_KEY: 'C123123123',
        PORT: 3000,
      },
    },
    {
      name: 'dev',
      script: 'index.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
