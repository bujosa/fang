import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '@database/dynamo_db.service';
import { DynamoDB } from 'aws-sdk';
import { User } from './user.model';
import { generateId } from '@packages/index';

@Injectable()
export class UserService {
  constructor(private readonly _dynamoDBService: DynamoDBService) {}

  async getUser(id: string): Promise<User> {
    const tableName = 'Users';

    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: tableName,
      Key: {
        id: id,
      },
    };

    console.log(params);

    const result = await this._dynamoDBService.get(params);

    console.log(result);

    return result.Item as unknown as User;
  }

  async createUser(user: User): Promise<void> {
    const tableName = 'Users';

    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: tableName,
      Item: {
        ...user,
        id: generateId(),
      },
    };

    await this._dynamoDBService.create(params);
  }
}
