import express from "express";
import TelegramBot from "node-telegram-bot-api";
import axios from "axios";
import dotenv from "dotenv";
import ImageKit from "imagekit";

dotenv.config();

const app = express();
app.use(express.json());

const bot = new TelegramBot(process.env.BOT_TOKEN);
console.log(bot);

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC,
  privateKey: process.env.IMAGEKIT_PRIVATE,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Webhook route
app.post(`/bot${process.env.BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start message
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "📸 Send me an image and I will remove the background!"
  );
});

// Handle photo
bot.on("photo", async (msg) => {
  const chatId = msg.chat.id;
  const photo = msg.photo[msg.photo.length - 1];

  try {
    bot.sendMessage(chatId, "⏳ Removing background...");

    const file = await bot.getFile(photo.file_id);
    const fileUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`;

    const response = await axios.get(fileUrl, {
      responseType: "arraybuffer",
    });

    const base64Image = Buffer.from(response.data).toString("base64");

    // Upload normally (NO transformation here)
const upload = await imagekit.upload({
  file: base64Image,
  fileName: "input.png",
});

// Generate background removed URL
const bgRemovedUrl = imagekit.url({
  path: upload.filePath,
  transformation: [
    {
      raw: "e-bgremove,f-png"
    }
  ],
});

// Send processed image
// Download transformed image
const transformedImage = await axios.get(bgRemovedUrl, {
  responseType: "arraybuffer",
});

// Send as buffer instead of URL
await bot.sendDocument(chatId, Buffer.from(transformedImage.data), {
  caption: "✅ Background Removed!",
});
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, "❌ Something went wrong.");
  }
});

// /info command
bot.onText(/\/info/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
`<b>🎨 Telegram Background Remover Bot</b>

Remove image backgrounds instantly using AI — fast, clean, and automatic.

━━━━━━━━━━━━━━━━━━

<b>✨ What This Bot Does</b>
• Send any photo  
• Background gets removed automatically  
• Receive transparent PNG image  
• Works in seconds ⚡  

━━━━━━━━━━━━━━━━━━

<b>👨‍💻 Developer</b>
© ${new Date().getFullYear()} GS Bishwasa. All rights reserved.

<b>🔗 Connect With Me</b>
GitHub: <a href="https://github.com/GS-Bishwasa">github.com/GS-Bishwasa</a>
LinkedIn: <a href="https://www.linkedin.com/in/gs-bishwasa-480764331">LinkedIn Profile</a>
Twitter (X): <a href="https://x.com/GSBishwasa">@GSBishwasa</a>
Telegram: @D_GmingHD

💬 Feel free to reach out for feedback or collaboration!`,
    { parse_mode: "HTML", disable_web_page_preview: true }
  );
});

app.listen(process.env.PORT, () => {
  console.log("Server running...");
});