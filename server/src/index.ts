import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { WebhookEvent } from "@line/bot-sdk";
import { textEventHandler } from "./modules/handler";
import { awakeMessage } from "./modules/awakeMessage";

const portString = process.env.PORT;
const port = portString ? parseInt(portString) : 3000;

const app = new Hono();
awakeMessage()

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