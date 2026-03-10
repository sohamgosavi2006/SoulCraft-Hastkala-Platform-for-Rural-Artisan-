require("dotenv").config();

const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const whatsappWebhook = require("./whatsappWebhook");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/webhook", whatsappWebhook);

const PORT = 4000;

app.listen(PORT, ()=>{
console.log("Server running on port", PORT);
});