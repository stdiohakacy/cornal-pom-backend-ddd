// import cluster from 'cluster';
// import os from 'os';

// async function bootstrap() {
//   const numCPUs = os.cpus().length;

//   if (cluster.isPrimary) {
//     console.log(`[MASTER ${process.pid}] Starting ${numCPUs} workers...`);

//     for (let i = 0; i < numCPUs; i++) {
//       cluster.fork();
//     }

//     cluster.on('exit', (worker, code, signal) => {
//       console.warn(`[MASTER] Worker ${worker.process.pid} died. Restarting...`);
//       cluster.fork();
//     });
//   } else {
//     await import('./main.worker');
//   }
// }

// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ReflectionService } from '@grpc/reflection';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '[::]:6000',
        package: ['group'],
        protoPath: [
          join(__dirname, '../src/presentation/grpc/protos/group.proto'),
        ],
        loader: {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
          includeDirs: [join(process.cwd(), 'proto')],
        },
        onLoadPackageDefinition: (pkg, server) => {
          new ReflectionService(pkg).addToServer(server);
        },
      },
    },
  );
  await app.listen();
  console.log(`🚀 gRPC microservice running on port 6000`);
}
bootstrap();
