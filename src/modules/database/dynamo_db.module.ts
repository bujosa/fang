import { Module } from '@nestjs/common';
import { DynamoDBService } from './dynamo_db.service';

@Module({
  providers: [DynamoDBService],
  exports: [DynamoDBService],
})
export class DynamoDBModule {}
