import { assertEnv, env } from './config/env.js';
import { createApp } from './app.js';

assertEnv();

const app = createApp();
const server = app.listen(env.port, () => {
  console.info(`Auralis backend listening on http://localhost:${env.port}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${env.port} is already in use. Stop the other process or change PORT in backend/.env.`);
    process.exit(1);
  }

  throw error;
});
