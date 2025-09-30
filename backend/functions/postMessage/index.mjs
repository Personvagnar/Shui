import { v4 as uuid } from "uuid";
import { client } from "../../services/db.mjs";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";

export const handler = async (event) => {
  try {
    const message = JSON.parse(event.body);

    const id = uuid().slice(0, 5);

    if (!message.username || !message.text) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "username and text are required" }),
      };
    }

    const item = {
      pk: { S: "MESSAGES" },
      sk: { S: id },
      username: { S: message.username },
      text: { S: message.text },
    };

    const command = new PutItemCommand({
      TableName: "ShuiMessagesTable",
      Item: item,
    });

    await client.send(command);

    return {
      statusCode: 201,
      body: JSON.stringify({
        id,
        username: message.username,
        text: message.text,
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not create message" }),
    };
  }
};
