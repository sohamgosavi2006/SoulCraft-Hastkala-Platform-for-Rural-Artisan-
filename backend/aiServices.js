const OpenAI = require("openai");

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

async function generateProduct(text){

const response = await openai.chat.completions.create({

model:"gpt-4o-mini",

messages:[

{
role:"system",
content:"Extract product title, description, price and generate artisan story. Return JSON."
},

{
role:"user",
content:text
}

]

});

return JSON.parse(response.choices[0].message.content);

}

module.exports = generateProduct;