# 🎨 Telegram Background Remover Bot

A powerful **Telegram bot** that automatically removes image backgrounds using AI — and sends back a clean PNG image instantly.

Perfect for profile pictures, thumbnails, product images, design work, and content creation.

🚀 **Live Bot:** (Add your bot link here)  
🌐 **Backend Deployed On:** Render  
☁️ **Image Processing:** ImageKit AI Background Removal  

---

## ✨ What This Bot Does

This bot allows you to:

- 📸 Send any image
- 🧠 Automatically remove the background
- 🖼 Receive a transparent PNG image
- ⚡ Get results in seconds

Simply send a photo → wait a few seconds → receive the processed image.

---

## ✅ Core Features

- 📸 Photo upload support
- 🎨 AI-powered background removal
- ⚡ Fast image processing
- 🔄 Webhook-based architecture
- ☁️ Cloud deployed
- 🔐 Secure environment variables
- 🤖 Telegram command support

---

## 🧠 How It Works

1. User sends a photo to the bot
2. Bot fetches image from Telegram server
3. Image is uploaded to ImageKit
4. Background removal transformation is applied
5. Processed image is downloaded
6. Bot sends cleaned image back to user

---

## 🤖 Bot Commands

| Command | Description |
|----------|-------------|
| `/start` | Start the bot |
| (Send Image) | Remove background automatically |

---

## 🧩 Tech Stack

- Node.js
- Express.js
- node-telegram-bot-api
- Axios
- ImageKit
- dotenv
- Render (Deployment)

---

## 🌐 Architecture Type

This bot uses:

- ✅ Webhook-based Telegram integration
- ✅ Express server for handling POST requests
- ❌ No polling (production-ready setup)
