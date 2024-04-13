const fetch = require('node-fetch');

class RoseGPT {
    static url = "https://flowgpt.com/chat";
    static working = true;
    static supports_gpt_35_turbo = true;
    static supports_message_history = true;
    static supports_system_message = true;
    static default_model = "gpt-3.5-turbo";
    static models = [
        "gpt-3.5-turbo",
        "llama2-13b",
        "google-palm-2",
        "pygmalion-13b",
        "gpt-3.5-turbo-16k",
        "mythalion-13b",
        "chronos-hermes-13b",
        "Mixtral-8x7B",
        "Dolphin-2.6-8x7B",
        "MythoMax-13B",
        "MythoMist-7B",
        "Lepton-MythoMax-13B",
        "OpenRouter-Mixtral-8x7B",
        "OpenRouter-Dolphin-2.6-8x7B"
    ];
    static model_aliases = {
        "gemini": "google-palm-2", 
        "gemini-pro": "google-gemini" // Currently gemini is not working in flowgpt 
    };

    static async * createAsyncGenerator(model, messages, proxy = null, temperature = 0.7, imageGenerator = false, kwargs) {
        model = this.getModel(model);
        const headers = {
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0",
            "Accept": "*/*",
            "Accept-Language": "en-US;q=0.7,en;q=0.3",
            "Accept-Encoding": "gzip, deflate, br",
            "Referer": "https://flowgpt.com/",
            "Content-Type": "application/json",
            "Authorization": "Bearer null",
            "Origin": "https://flowgpt.com",
            "Connection": "keep-alive",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "TE": "trailers"
        };

        const history = messages.filter(message => message.role !== "system").slice(0, -1);
        const systemMessage = messages.filter(message => message.role === "system").map(message => message.content).join("\n") || "You are helpful assistant. Follow the user's instructions carefully.";

        
        const data = {
            "model": model,
            "nsfw": false,
            "question": messages[messages.length - 1].content,
            "history": [{"role": "assistant", "content": "Hello, how can I help you today?"}, ...history],
            "system": systemMessage,
            "temperature": temperature,
            "promptId": `model-${model}`,
            "documentIds": [],
            "chatFileDocumentIds": [],
            "generateImage": imageGenerator,
            "generateAudio": false,
            "imageModel":"DALLE3"
        };

        if(imageGenerator){
            data.promptId = 'model-dall-e-3';
        }

        
        try {
            const response = await fetch("https://backend-k8s.flowgpt.com/v2/chat-anonymous", {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
                proxy: proxy
            });

            if (response.status === 429) {
                throw new Error("Rate limit reached!");
            }

            if (!response.ok) {
                throw new Error(`HTTP error! Response: ${await response.text()}\nStatus: ${response.status}`);
            }

            const responseText = await response.text();

    // Split response text by newline characters and parse each JSON string
    const jsonResponseArray = responseText.split("\n").filter(Boolean); // Filter out empty strings
    for (const jsonResponse of jsonResponseArray) {
        const message = JSON.parse(jsonResponse);
        if (!message.event || message.event !== "text") {
            continue;
        }
        yield decodeURIComponent(message.data);
      }
} catch (error) {
    console.error('Error:', error.message);
}
    }

    static getModel(model) {
        return this.model_aliases[model] || model || this.default_model;
    }
}
module.exports = RoseGPT;
