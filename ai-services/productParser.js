function extractProduct(message){

const lines = message
.split("\n")
.map(l => l.trim())
.filter(l => l.length > 0);


/* -----------------------
TITLE
First line only
----------------------- */

const title = lines[0];


/* -----------------------
PRICE
----------------------- */

let price = 0;

lines.forEach(l=>{
const match = l.match(/price\s*(\d+)/i);
if(match){
price = parseInt(match[1]);
}
});


/* -----------------------
UPI
----------------------- */

let upi = null;

lines.forEach(l=>{
const match = l.match(/[a-zA-Z0-9._-]+@[a-zA-Z]+/);
if(match){
upi = match[0];
}
});


/* -----------------------
DESCRIPTION
Everything except title
----------------------- */

const description = lines
.slice(1)
.filter(l=>!l.toLowerCase().includes("price"))
.filter(l=>!l.toLowerCase().includes("upi"))
.join(" ");


/* -----------------------
RETURN OBJECT
----------------------- */

return{

title,
price,
upi,
image_url:null,
description

};

}

module.exports = extractProduct;