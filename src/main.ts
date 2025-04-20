import cluster from 'cluster';
import os from 'os';

async function bootstrap() {
  const numCPUs = os.cpus().length;

  if (cluster.isPrimary) {
    console.log(`[MASTER ${process.pid}] Starting ${numCPUs} workers...`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.warn(`[MASTER] Worker ${worker.process.pid} died. Restarting...`);
      cluster.fork();
    });
  } else {
    await import('./main.worker');
  }
}

bootstrap();
