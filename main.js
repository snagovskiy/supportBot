import { Bot, webhookCallback } from "https://deno.land/x/grammy@v1.31.2/mod.ts";
const token = Deno.env.get("BOT_TOKEN");
if (!token) throw new Error("BOT_TOKEN не установлен");

const bot = new Bot(token);

import bot from "./index.js";

const handleUpdate = webhookCallback(bot, "std/http");

Deno.serve(async (req) => {
  if (req.method === "POST") {
    const url = new URL(req.url);
    if (url.pathname.slice(1) === bot.token) {
      try {
        return await handleUpdate(req);
      } catch (err) {
        console.error(err);
      }
    }
  }
  return new Response();
});
