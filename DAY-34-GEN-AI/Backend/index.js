import readline from "readline/promises";
import {ChatMistralAI} from "@langchain/mistralai";
import dotenv from "dotenv";
dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const model = new ChatMistralAI({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-small-latest"
    
})


while(true){
    const userInput = await rl.question("You: ");
    const response = await model.invoke(userInput);
    console.log(`AI: ${response.text}`);
}



rl.close()
