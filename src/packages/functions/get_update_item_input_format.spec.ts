import { getUpdateItemInputFormat } from './get_update_item_input_format';

describe('get_update_item_input_format', () => {
  it('should return a string in the correct format', () => {
    // Arrange
    const input = {
      name: 'New Item Name',
      description: 'New Item Description',
      price: 9.99,
      quantity: 10,
    };
    const id = '12345';
    const tableName = 'Items';

    // Act
    const actualOutput = getUpdateItemInputFormat(tableName, id, input);

    // Assert
    const expectedOutput = {
      TableName: 'Items',
      Key: {
        id: '12345',
      },
      UpdateExpression:
        'set #name = :name, #description = :description, #price = :price, #quantity = :quantity',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#description': 'description',
        '#price': 'price',
        '#quantity': 'quantity',
      },
      ExpressionAttributeValues: {
        ':name': 'New Item Name',
        ':description': 'New Item Description',
        ':price': 9.99,
        ':quantity': 10,
      },
      ReturnValues: 'UPDATED_NEW',
    };

    expect(actualOutput).toEqual(expectedOutput);
  });
});
