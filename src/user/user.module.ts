import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DynamoDBModule } from '@database/dynamo_db.module';

@Module({
  imports: [DynamoDBModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
