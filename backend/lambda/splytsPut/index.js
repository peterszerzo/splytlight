const aws = require("aws-sdk");

const client = new aws.DynamoDB.DocumentClient();

exports.handler = async event => {
  try {
    const item = JSON.parse(event.body);
    await client
      .put({
        TableName: "Splyts",
        Item: item
      })
      .promise();

    return {
      isBase64Encoded: false,
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      multiValueHeaders: {},
      body: JSON.stringify(item, null, 0)
    };
  } catch (err) {
    return {
      isBase64Encoded: false,
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      multiValueHeaders: {},
      body: JSON.stringify(
        {
          message: "Something went wrong",
          err: err
        },
        null,
        0
      )
    };
  }
};
