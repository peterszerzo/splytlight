const aws = require("aws-sdk");

const client = new aws.DynamoDB.DocumentClient();

exports.handler = async event => {
  try {
    const item = event;
    const result = await client
      .put({
        TableName: "Splyts",
        Item: item
      })
      .promise();

    return {
      statusCode: 200,
      body: item
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: "Something went wrong",
        details: err.toString()
      })
    };
  }
};
