import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { ClientConfig, Client, WebhookEvent, TextMessage, MessageAPIResponseBase } from "@line/bot-sdk";

const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || 'copy_paste_here',
  channelSecret: process.env.CHANNEL_SECRET || 'copy_paste_here',
};

const portString = process.env.PORT;
const port = portString ? parseInt(portString) : 3000;
const client = new Client(clientConfig);
const app = new Hono();

const textEventHandler = async (event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return;
  }
  const { replyToken } = event;
  const { text } = event.message;
  const response: TextMessage = {
    type: 'text',
    text: text
  };
  await client.replyMessage(replyToken, response);
}

app.use("/favicon.ico", serveStatic({ path: "./public/favicon.ico" }));
app.get("/", (c) => {
  return c.json({ message: "Hello LINE Bot!" });
});
app.post("/webhook", async (c) => {
  const data = await c.req.json();
  const events: WebhookEvent[] = (data as any).events;
  await Promise.all(
    events.map(async (event: WebhookEvent) => {
      try {
        await textEventHandler(event);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err);
        }
        return c.json({
          status: "error",
        });
      }
    })
  );
  return c.json({ message: "ok" });
});

console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};