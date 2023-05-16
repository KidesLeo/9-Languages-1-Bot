import { Telegraf } from "telegraf";
import * as dotenv from "dotenv";

function generateString(length: number) {
    const KeyString =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=";

    let RandString = "";

    for (let i = 0; i < length; i++) {
        RandString += KeyString.charAt(
            Math.floor(Math.random() * KeyString.length)
        );
    }

    return RandString;
}

dotenv.config();

const token = process.env.BOT_TOKEN || "";
const bot = new Telegraf(token);

bot.launch();

console.log("Running bot...");

bot.start(async (ctx) =>
    ctx.reply(
        "Press /generate to get a newly generated password. You can also send a number to receive a password of that length."
    )
);

bot.command("generate", async (ctx) => {
    const messageArr = ctx.update.message.text.split(" ");

    if (messageArr.length == 2) {
        return ctx.reply(generateString(Number(messageArr[1])));
    }

    return ctx.reply(generateString(12));
});
