import { GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../../services/db.mjs";

export const handler = async (event) => {
  try {
    const { id } = event.pathParameters;
    const { text } = JSON.parse(event.body);

    if (!id || !text ||text.trim() === "") {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "ID and text are required!" }),
      };
    }

    const getMessage = new GetItemCommand({
      TableName: "ShuiMessagesTable",
      Key: {
        pk: { S: "MESSAGES" },
        sk: { S: id },
      },
    });

    const getResult = await client.send(getMessage);

    if (!getResult.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Message not found" }),
      };
    }

    const updateMessage = new UpdateItemCommand({
      TableName: "ShuiMessagesTable",
      Key: {
        pk: { S: "MESSAGES" },
        sk: { S: id },
      },
      UpdateExpression: "SET #text = :text",
      ExpressionAttributeNames: {
        "#text": "text",
      },
      ExpressionAttributeValues: {
        ":text": { S: text },
      },
      ReturnValues: "ALL_NEW",
    });

    const updateResult = await client.send(updateMessage);

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: updateResult.Attributes.sk.S,
        username: updateResult.Attributes.username.S,
        text: updateResult.Attributes.text.S,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not update message" }),
    };
  }
};
