import { Module } from '@nestjs/common';
import { EsService } from './es.service';
import { EsController } from './es.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: () => ({
        node: 'http://localhost:9200',
      }),
    }),
  ],
  controllers: [EsController],
  providers: [EsService],
})
export class EsModule {}
