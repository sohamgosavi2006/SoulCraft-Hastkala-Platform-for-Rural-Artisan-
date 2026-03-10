# SoulCraft-Hastkala-Platform-for-Rural-Artisan-
HastKala is a direct-to-consumer e-commerce platform designed to empower rural artisans and micro-entrepreneurs. It is a WhatsApp-first platform that allows artisans to list products using only voice notes and photos, which are then processed by AI into professional English listings.

Project Demonstration -> https://drive.google.com/file/d/19UstgLY3ZbES6ee48SJAtqpC7HP9rNLg/view?usp=drive_link

SoulCraft — AI Powered Artisan Marketplace

SoulCraft is an AI-enabled marketplace that empowers rural artisans to sell products using only WhatsApp.
Instead of learning complex apps or websites, artisans simply send a WhatsApp message with product details and image, and the system automatically publishes the product on an online marketplace.

The platform integrates AI parsing, WhatsApp automation, Razorpay payments, and logistics notification, making it a complete digital commerce solution for artisans.

Artisan WhatsApp Message
        ↓
WhatsApp Web Bot
        ↓
AI Product Parser
        ↓
MySQL Database
        ↓
SoulCraft Marketplace
        ↓
Customer Payment (Razorpay)
        ↓
Order Stored + Artisan Notification

SoulCraft
│
├── backend
│   ├── server.js
│   ├── routes.js
│   ├── db.js
│   ├── whatsappClient.js
│   ├── whatsappWebhook.js
│   └── ai-services
│        └── productParser.js
│
├── frontend
│   ├── login.html
│   ├── register.html
│   ├── marketplace.html
│   ├── orders.html
│   ├── script.js
│   ├── auth.js
│   ├── style.css
│   └── assets
│
└── README.md


ON TERMINAL -> 

Launch -> frontend/login.html

From Backend Folder -

Launch -> node server.js
Launch -> whatsappClient.js
