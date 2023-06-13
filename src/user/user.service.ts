import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '@database/dynamo_db.service';
import { DynamoDB } from 'aws-sdk';
import { User } from './user.model';
import { generateId } from '@packages/index';
import { getUpdateItemInputFormat } from '@packages/functions/get_update_item_input_format';

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

    const result = await this._dynamoDBService.get(params);

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

  async updateUser(id: string, user: User): Promise<User> {
    return this._dynamoDBService.update(
      getUpdateItemInputFormat('Users', id, user as any),
    ) as unknown as User;
  }

  async deleteUser(id: string): Promise<void> {
    const tableName = 'Users';

    const params: DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: tableName,
      Key: {
        id: id,
      },
    };

    await this._dynamoDBService.delete(params);
  }

  async getAllUsers(): Promise<User[]> {
    const tableName = 'Users';

    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: tableName,
    };

    return this._dynamoDBService.scan(params);
  }
}
