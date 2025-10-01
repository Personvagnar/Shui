import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../../services/db.mjs";

export const handler = async (event) => {
  try {
    const username = event.pathParameters.username;

    const command = new QueryCommand({
      TableName: "ShuiMessagesTable",
      IndexName: "usernameIndex",
      KeyConditionExpression: "username = :u",
      ExpressionAttributeValues: {
        ":u": { S: username },
      },
    });

    const result = await client.send(command);

    const items = result.Items || [];

    const messages = items.map((item) => ({
      id: item.sk.S,
      username: item.username.S,
      text: item.text.S,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(messages),
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not get user messages" }),
    };
  }
};
