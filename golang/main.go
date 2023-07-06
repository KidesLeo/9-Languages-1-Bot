package main

import (
	"context"
	"fmt"
	"log"
	"math/rand"
	"os"
	"os/signal"
	"strconv"
	"strings"

	"github.com/go-telegram/bot"
	"github.com/go-telegram/bot/models"
	"github.com/joho/godotenv"
)

// String generation function
func generateString(length int) string {

	var characters string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-="

	var newString string

	for x := 0; x < length; x++ { // ++ is a statement.
		newString = newString + string(characters[rand.Intn(len(characters))])

	}

	return "||" + bot.EscapeMarkdown(newString) + "||"
}

func main() {

	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt)

	defer cancel()

	b, err := bot.New(os.Getenv("BOT_TOKEN"))

	if nil != err {
		panic(err)
	}

	b.RegisterHandler(bot.HandlerTypeMessageText, "/start", bot.MatchTypeExact, startHandler)

	b.RegisterHandler(bot.HandlerTypeMessageText, "/generate", bot.MatchTypeExact, generateHandler)

	// Generate handler with arguments
	b.RegisterHandler(bot.HandlerTypeMessageText, "/generate", bot.MatchTypePrefix, generateWithArgumentHandler)

	b.RegisterHandler(bot.HandlerTypeMessageText, "/help", bot.MatchTypeExact, helpHandler)

	fmt.Println("Running bot...")

	b.Start(ctx)
}

func startHandler(ctx context.Context, b *bot.Bot, update *models.Update) {
	b.SendMessage(ctx, &bot.SendMessageParams{
		ChatID: update.Message.Chat.ID,
		Text:   "Press /generate to get a newly generated password. You can also send a number to receive a password of that length.",
	})
}

func generateHandler(ctx context.Context, b *bot.Bot, update *models.Update) {

	b.SendMessage(ctx, &bot.SendMessageParams{

		ChatID: update.Message.Chat.ID,

		Text: generateString(12),

		ParseMode: models.ParseModeMarkdown,
	})
}

func generateWithArgumentHandler(ctx context.Context, b *bot.Bot, update *models.Update) {

	commandArgs := strings.Split(update.Message.Text, " ")

	if len(commandArgs) != 2 {

		b.SendMessage(ctx, &bot.SendMessageParams{

			ChatID: update.Message.Chat.ID,

			Text: "Incorrect amount of arguments, try /help",

			ParseMode: models.ParseModeMarkdown,
		})

		return

	}

	newLength, err := strconv.Atoi(commandArgs[len(commandArgs)-1])

	if nil != err {

		b.SendMessage(ctx, &bot.SendMessageParams{

			ChatID: update.Message.Chat.ID,

			Text: "Be sure to use only integer parameters, try /help",

			ParseMode: models.ParseModeMarkdown,
		})

		return

	}

	b.SendMessage(ctx, &bot.SendMessageParams{

		ChatID: update.Message.Chat.ID,

		Text: generateString(newLength),

		ParseMode: models.ParseModeMarkdown,
	})

}

func helpHandler(ctx context.Context, b *bot.Bot, update *models.Update) {
	b.SendMessage(ctx, &bot.SendMessageParams{
		ChatID: update.Message.Chat.ID,
		Text: "Use the /generate command to create an AlphaNumeric 12 character password\\. You can provide an argument to set the length of password," +
			"\nfor example,\n `/generate 15`   to generate a string of 15 character\\.",
		ParseMode: models.ParseModeMarkdown,
	})
}
