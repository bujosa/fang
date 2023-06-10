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

  async updateUser(user: User): Promise<User> {
    const tableName = 'Users';

    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: tableName,
      Key: {
        id: user.id,
      },
      UpdateExpression: 'set #name = :name, #email = :email',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#email': 'email',
      },
      ExpressionAttributeValues: {
        ':name': user.name,
        ':email': user.email,
      },

      ReturnValues: 'UPDATED_NEW',
    };

    return this._dynamoDBService.update(params) as unknown as User;
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

    const result = await this._dynamoDBService.scan(params);

    return result.Items as unknown as User[];
  }
}
