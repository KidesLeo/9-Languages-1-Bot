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

