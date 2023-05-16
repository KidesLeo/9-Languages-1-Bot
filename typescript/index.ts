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

    return (
        "||" + RandString.replace(/[~!@#$%^&*()-_=+{}\|;:',.?]/g, "\\$&") + "||"
    );
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
    const MessageArr = ctx.update.message.text.split(" ");

    if (MessageArr.length == 2) {
        return await ctx.replyWithMarkdownV2(
            generateString(Number(MessageArr[1])),
            {
                parse_mode: "MarkdownV2",
            }
        );
    } else if (MessageArr.length > 2)
        return ctx.reply("Incorrect amount of arguments, try /help");

    return await ctx.replyWithMarkdownV2(generateString(12), {
        parse_mode: "MarkdownV2",
    });
});

bot.command(
    "help",
    async (ctx) =>
        await ctx.replyWithMarkdownV2(
            "Use the /generate command to create an AlphaNumeric 12 character password\\. \nYou can also provide an argument to set the length of password, " +
                "for example, `/generate 15`   to generate a string of 15 character\\.",
            { parse_mode: "MarkdownV2" }
        )
);
