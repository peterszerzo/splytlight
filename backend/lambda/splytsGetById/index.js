const aws = require("aws-sdk");

const client = new aws.DynamoDB.DocumentClient();

exports.handler = async event => {
  try {
    const item = await client
      .get({
        TableName: "Splyts",
        Key: {
          treeId: event.pathParameters.treeId
        }
      })
      .promise();

    if (!item || typeof item !== "object") {
      throw new Error("MALFORMED");
    }

    if (Object.keys(item).length === 0) {
      throw new Error("NOT_FOUND");
    }

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
