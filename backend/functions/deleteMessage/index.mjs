import { GetItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../../services/db.mjs";

export const handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "ID is required!"}),
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

    if(!getResult.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "ID's not valid. Could not find message with that ID"}),
      };
    }

    const deleteMessage = new DeleteItemCommand({
      TableName: "ShuiMessagesTable",
      Key: {
        pk: { S: "MESSAGES" },
        sk: { S: id },
      },
    });

    await client.send(deleteMessage);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Message ${id} was deleted!`}),
    };

  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not delete message"}),
    };
  }
};
