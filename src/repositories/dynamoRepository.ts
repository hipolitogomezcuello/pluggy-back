const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const dynamoRepository = {
    async get(ID: string, TableName: string) {
        const params = {
            TableName,
            Key: {
                ID,
            },
        };

        const data = await documentClient.get(params).promise();

        if (!data || !data.Item) {
            throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`);
        }
        console.log(data);

        return data.Item;
    },
    async write(ID: string, TableName: string, data: string) {
      const Item = {
        ID,
        body: data
      }
      const params = {
          TableName,
          Item,
      };

      const res = await documentClient.put(params).promise();

      if (!res) {
          throw Error(`There was an error inserting ID of ${ID} in table ${TableName}`);
      }

      return data;
    }
};

export default dynamoRepository;