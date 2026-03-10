const express = require("express");
const router = express.Router();
const db = require("./db");

const extractProduct = require("../ai-services/productParser");

/*
------------------------------------------------
WEBHOOK VERIFICATION (Meta requirement)
------------------------------------------------
*/

router.get("/webhook", (req, res) => {

const VERIFY_TOKEN = "soulcraft_verify";

const mode = req.query["hub.mode"];
const token = req.query["hub.verify_token"];
const challenge = req.query["hub.challenge"];

console.log("Verification request received:", req.query);

if (mode === "subscribe" && token === VERIFY_TOKEN) {

console.log("Webhook VERIFIED");

return res.status(200).send(challenge);

} else {

console.log("Webhook verification FAILED");

return res.sendStatus(403);

}

});


/*
------------------------------------------------
RECEIVE WHATSAPP MESSAGES
------------------------------------------------
*/

router.post("/webhook", async (req, res) => {

try {

const message =
req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body;

const phone =
req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from;

if (!message) {
return res.sendStatus(200);
}

console.log("Incoming WhatsApp Message:", message);

/* AI Extract Product */

const product = await extractProduct(message);

console.log("AI Extracted Product:", product);

let artisanId;

/* Check if artisan exists */

const [rows] = await db.promise().query(
"SELECT id FROM artisans WHERE phone=?",
[phone]
);

if (rows.length === 0) {

/* Create new artisan */

const [result] = await db.promise().query(
"INSERT INTO artisans(phone, upi_id) VALUES (?,?)",
[phone, product.upi]
);

artisanId = result.insertId;

console.log("New artisan created:", artisanId);

} else {

artisanId = rows[0].id;

console.log("Existing artisan:", artisanId);

}

/* Insert product */

await db.promise().query(
`INSERT INTO products
(artisan_id, title, description, price, image_url)
VALUES (?, ?, ?, ?, ?)`,
[
artisanId,
product.title,
product.description,
product.price,
product.image_url
]
);

console.log("Product inserted successfully");

} catch (error) {

console.error("Webhook Error:", error);

}

res.sendStatus(200);

});

module.exports = router;