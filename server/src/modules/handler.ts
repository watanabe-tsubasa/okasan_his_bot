import { Client, ClientConfig, MessageAPIResponseBase, TextMessage, WebhookEvent } from "@line/bot-sdk";
import { hisReply } from "./hisReply";

const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || 'copy_paste_here',
  channelSecret: process.env.CHANNEL_SECRET || 'copy_paste_here',
};
const client = new Client(clientConfig);

export const textEventHandler = async (event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return;
  }
  const { replyToken } = event;
  const { text } = event.message;
  console.log(text);
  const hisText = await hisReply(text);
  const replyText = hisText !== null ? hisText:
  'ごめんね。お母さん調子悪いみたい。もう一度言ってもらうか、また後で話しかけてね。'
  
  const response: TextMessage = {
    type: 'text',
    text: replyText
  };
  console.log(replyText);
  await client.replyMessage(replyToken, response);
}