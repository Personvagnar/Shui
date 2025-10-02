import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../../services/db.mjs";

export const handler = async (event) => {
  try {
    // Säker null-check för pathParameters
    const username = event.pathParameters?.username;
    if (!username) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Username is required" }),
      };
    }

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

    // Mappa DynamoDB-attributen korrekt
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
    console.error("Error in getMessageByUser:", error, event);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Could not get user messages" }),
    };
  }
};
