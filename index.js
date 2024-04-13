// Import RoseGPT class from RoseGPT.js file
const RoseGPT = require('./RoseGPT');

(async () => {
    const model = "gpt-3.5-turbo"; // Specify your LLM model here
    const proxy = null; // Specify your proxy if needed
    const temperature = 0.7; // Specify temperature
    const messages = [{ role: "user", content: "Hi, Who are you?" }];

    // Ask user if they want to generate an image
    let imageGenerator = await prompt("Do you want to generate an image? (Yes/No)");
    if (imageGenerator.toLowerCase() == "yes") {
        imageGenerator = true;
    } else {
        imageGenerator = false;
    }

    // Conversation loop
    while (true) {
        const generator = RoseGPT.createAsyncGenerator(model, messages, proxy, temperature, imageGenerator);
        let modelResponse = ""; // Initialize a string to store model's response

        // Generate responses asynchronously
        for await (const chunk of generator) {
            modelResponse += `${chunk}`;
        }

        // Send Reply to the User
        console.log("LLM:", modelResponse);

        // Log the model's response
        messages.push({ role: "assistant", content: modelResponse });

        // Get Prompt From User
        const userMessage = await prompt("User: ");

        // Log the user's Message to Array
        messages.push({ role: "user", content: userMessage });

        // Check if user wants to end the conversation
        if (userMessage.toLowerCase() === "exit") {
            console.log("\nEnding conversation... Have a Nice Day! :)");
            break;
        }
    }
})();

// Function to prompt user for input
function prompt(question) {
    return new Promise((resolve, reject) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question(question, (input) => {
            readline.close();
            resolve(input);
        });
    });
}
