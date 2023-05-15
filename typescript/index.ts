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

