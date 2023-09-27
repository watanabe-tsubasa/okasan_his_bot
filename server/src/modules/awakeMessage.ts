import { Client, ClientConfig, MessageAPIResponseBase } from "@line/bot-sdk";

const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || 'copy_paste_here',
  channelSecret: process.env.CHANNEL_SECRET || 'copy_paste_here',
};
const client = new Client(clientConfig);

export const awakeMessage  = async (): Promise<MessageAPIResponseBase> => {
  try {
    const message = await client.broadcast({
      type: 'text',
      text: 'おはよう！暇だったらお話しようか。',
    });
    return message;
  } catch (error) {
    console.error(error);
    throw error;
  }
}