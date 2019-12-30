const aws = require("aws-sdk");

const client = new aws.DynamoDB.DocumentClient();

exports.handler = async event => {
  const items = await client.scan({ TableName: "Splyts" }).promise();

  return {
    isBase64Encoded: false,
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    multiValueHeaders: {},
    body: JSON.stringify(items, null, 0)
  };
};
