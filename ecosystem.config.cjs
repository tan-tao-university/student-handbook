module.exports = {
  apps: [
    {
      name: 'student-handbook',
      script: 'node_modules/next/dist/bin/next',
      args: `start -p ${process.env.PORT || 65201}`,
      cwd: './',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 65201,
      },
    },
  ],
};
