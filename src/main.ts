import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  ClientKafka,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
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

  const kafkaClient = app.get<ClientKafka>('KAFKA_PRODUCER');
  await kafkaClient.connect();

  await app.listen();
  console.log(`🚀 gRPC microservice running on port 6000`);
}
bootstrap();
