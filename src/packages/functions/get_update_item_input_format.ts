import { DynamoDB } from 'aws-sdk';

export const getUpdateItemInputFormat = (
  tableName: string,
  key: string,
  record: Record<string, unknown>,
): DynamoDB.DocumentClient.UpdateItemInput => {
  const params: DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: tableName,
    Key: {
      id: key,
    },
    UpdateExpression: '',
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
    ReturnValues: 'UPDATED_NEW',
  };

  Object.entries(record).forEach(([key, value]) => {
    if (params.UpdateExpression === '') {
      params.UpdateExpression += `set #${key} = :${key}`;
    } else {
      params.UpdateExpression += `, #${key} = :${key}`;
    }
    params.ExpressionAttributeNames[`#${key}`] = key;
    params.ExpressionAttributeValues[`:${key}`] = value;
  });

  return params;
};
