import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateTableCommand,
  DeleteItemInput,
  DeleteItemOutput,
  DynamoDBClient,
  GetItemInput,
  GetItemOutput,
  PutItemInput,
  PutItemOutput,
  QueryCommand,
  QueryInput,
  QueryOutput,
  ScanCommand,
  ScanInput,
  UpdateItemInput,
  UpdateItemOutput,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamoDBService implements OnModuleInit {
  private client: DynamoDBClient;
  private doClient: DynamoDBDocumentClient;

  constructor() {
    this.client = new DynamoDBClient({});

    this.doClient = DynamoDBDocumentClient.from(this.client);
  }

  async onModuleInit() {
    const command = new CreateTableCommand({
      TableName: 'Users',
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH',
        },
      ],
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    });

    // const response = await this.client.send(command);

    // console.log(response);
  }

  async create(params: PutItemInput): Promise<PutItemOutput> {
    return this.doClient.send(new PutCommand(params));
  }

  async get(params: GetItemInput): Promise<GetItemOutput> {
    return this.doClient.send(new GetCommand(params));
  }

  async update(params: UpdateItemInput): Promise<UpdateItemOutput> {
    return this.doClient.send(new UpdateCommand(params));
  }

  async delete(params: DeleteItemInput): Promise<DeleteItemOutput> {
    return this.doClient.send(new DeleteCommand(params));
  }

  async query(params: QueryInput): Promise<QueryOutput> {
    return this.client.send(new QueryCommand(params));
  }

  async scan(params: ScanInput): Promise<any> {
    const result = await this.client.send(new ScanCommand(params));

    const items = result.Items.map((item) => {
      const transformedItem: Record<string, unknown> = {};

      for (const [key, value] of Object.entries(item)) {
        const dataType = Object.keys(value)[0];
        transformedItem[key] = value[dataType];
      }

      return transformedItem;
    });

    return items;
  }
}
