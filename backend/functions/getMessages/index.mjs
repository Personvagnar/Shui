import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../../services/db.mjs";

export const handler = async () => {
  try {
    const command = new QueryCommand({
      TableName: "ShuiMessagesTable",
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": { S: "MESSAGES" },
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
      /*headers: {
        "Access-Control-Allow-Origin": "*",
      },*/
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not get messages" }),
    };
  }
};
