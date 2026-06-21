import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { GeminiService } from './aiGemiuni.service';

@Module({
  controllers: [AiController],
  providers: [AiService, GeminiService],
})
export class AiModule {}
