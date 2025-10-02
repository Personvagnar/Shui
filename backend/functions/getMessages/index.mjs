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
      createdAt: item.createdAt?.S || null,
      timestamp: item.timestamp?.N ? Number(item.timestamp.N) : null
    }));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messages),
    };

  } catch (error) {
    console.error("Error in getMessages:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Could not get messages" }),
    };
  }
};
