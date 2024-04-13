# RoseGPT

## 🌹 Introduction

RoseGPT is a Node.js class that provides access to 15 different Language Models (LLMs) for natural language processing and conversation generation. It utilizes the `node-fetch` library for making HTTP requests.

By using this repository or any code related to it, you agree to the [legal notice](LEGAL_NOTICE.md). **The author is not responsible for the usage of this repository nor endorses it**, nor is the author responsible for any copies, forks, re-uploads made by other users, or anything else related to GPT4Free. This is the author's only account and repository. To prevent impersonation or irresponsible actions, please comply with the GNU GPL license this Repository uses.
## ⚡Features

- Access to 15 different Language Models (LLMs).
- Supports various configurations such as message history, system messages, and temperature.
- OPTion to generate images with specific models.
- Supports conversation logging and termination.

## 💡 Usage

1. Install dependencies:

   ```bash
   npm install node-fetch@2
   ```

2. Include `RoseGPT` class in your project.

3. Initialize the class with appropriate parameters.

4. Use the provided methods to generate responses and interact with users.

5. If you want to run/test it in your terminal, then run index.js file.

```javascript
node index.js
```

## ⚙️ Configuration

- **Model:** The default model is `"gpt-3.5-turbo"`. You can specify a different model from the available oPTions.
- **Proxy:** If you want to bypass the rate limit, specify your proxy configuration.
- **Temperature:** Set the temperature for response generation.
- **Message History:** Provide message history to the `createAsyncGenerator` method.
- **System Message:** Include a system message if required.
- **Image Generation:** Enable image generation by setting `imageGenerator` to `true`.

## 🤖 Available Models

- `gpt-3.5-turbo`
- `llama2-13b`
- `google-palm-2`
- `pygmalion-13b`
- `gpt-3.5-turbo-16k`
- `mythalion-13b`
- `chronos-hermes-13b`
- `Mixtral-8x7B`
- `Dolphin-2.6-8x7B`
- `MythoMax-13B`
- `MythoMist-7B`
- `Lepton-MythoMax-13B`
- `OpenRouter-Mixtral-8x7B`
- `OpenRouter-Dolphin-2.6-8x7B`

## 🍀 Acknowledgments

- This project utilizes the `node-fetch` library for making HTTP requests.
- This project utilizes flowgpt's servers to get response from LLMs.

## 📜 License

This project is licensed under [GNU GPL v3.0](LICENSE.md)
