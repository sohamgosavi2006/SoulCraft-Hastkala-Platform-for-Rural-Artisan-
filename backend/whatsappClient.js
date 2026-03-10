const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const path = require("path");

const extractProduct = require("../ai-services/productParser");
const db = require("./db");

/*
TARGET WHATSAPP NUMBER
Only messages sent to this number will create products
*/

// SoulCraft Server Number
const TARGET_CHAT = "919868928525@c.us";
// Scan using whatsapp 
const client = new Client({
    puppeteer: {
        headless: true
    }
});


/* QR LOGIN */

client.on("qr", (qr) => {

    console.log("Scan QR with WhatsApp");
    qrcode.generate(qr, { small: true });

});


/* READY EVENT */

client.on("ready", () => {

    console.log("WhatsApp Client Ready");

});


/*
CAPTURE SELF MESSAGES
Only process messages you send to the bot number
*/

client.on("message_create", async (msg) => {

try{

/* Ignore messages from others */

if(!msg.fromMe) return;

/* Only messages sent to SoulCraft bot */

if(msg.to !== TARGET_CHAT) return;


/* Ignore empty messages */

if(!msg.body && !msg.hasMedia) return;

console.log("SoulCraft Product Message:", msg.body);


/* --------------------------------
AI PARSE PRODUCT TEXT
-------------------------------- */

const product = await extractProduct(msg.body || "");

console.log("Parsed Product:", product);


/* --------------------------------
HANDLE IMAGE
-------------------------------- */

let image_url = product.image_url || null;

if(msg.hasMedia){

    console.log("Media detected");

    const media = await msg.downloadMedia();

    if(media){

        const fileName = Date.now() + ".jpg";

        const uploadDir = path.join(__dirname,"../frontend/assets");

        /* Create folder if not exists */

        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir,{recursive:true});
        }

        const filePath = path.join(uploadDir,fileName);

        fs.writeFileSync(filePath,media.data,{encoding:"base64"});

        image_url = "assets/" + fileName;

        console.log("Image saved:", image_url);

    }

}


/* --------------------------------
GET ARTISAN PHONE
-------------------------------- */

const phone = msg.from.replace("@c.us","");

let artisanId;


/* --------------------------------
CHECK ARTISAN
-------------------------------- */

const [rows] = await db.promise().query(
"SELECT id FROM artisans WHERE phone=?",
[phone]
);


if(rows.length === 0){

    const [result] = await db.promise().query(
    "INSERT INTO artisans(name,phone,upi_id) VALUES (?,?,?)",
    [
        "WhatsApp Artisan",
        phone,
        product.upi
    ]
    );

    artisanId = result.insertId;

}else{

    artisanId = rows[0].id;

}


/* --------------------------------
INSERT PRODUCT
-------------------------------- */

await db.promise().query(
`INSERT INTO products
(artisan_id,title,description,price,image_url)
VALUES (?,?,?,?,?)`,
[
artisanId,
product.title,
product.description,
product.price,
image_url
]
);

console.log("Product inserted successfully");




}catch(error){

console.log("Error:",error);

}

});


/* START CLIENT */

client.initialize();