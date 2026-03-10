const express = require("express");
const router = express.Router();
const db = require("./db");


/* ==============================
   REGISTER USER
============================== */

router.post("/register", async (req, res) => {

try {

const {
full_name,
email,
phone,
password,
address,
city,
state,
pincode
} = req.body;


/* validation */

if(!full_name || !email || !phone || !password){

return res.status(400).json({
success:false,
message:"Required fields missing"
});

}


/* check existing user */

const [existing] = await db.promise().query(
"SELECT id FROM users WHERE email=?",
[email]
);

if(existing.length > 0){

return res.json({
success:false,
message:"User already exists"
});

}


/* insert user */

await db.promise().query(

`INSERT INTO users
(full_name,email,phone,password,address,city,state,pincode)
VALUES (?,?,?,?,?,?,?,?)`,

[
full_name,
email,
phone,
password,
address || "",
city || "",
state || "",
pincode || ""
]

);


res.json({
success:true
});

} catch(err){

console.log("REGISTER ERROR:", err);

res.status(500).json({
success:false,
message:"Server error"
});

}

});



/* ==============================
   LOGIN USER
============================== */

router.post("/login", async (req, res) => {

try {

const {email, password} = req.body;

if(!email || !password){

return res.status(400).json({
success:false,
message:"Missing login fields"
});

}

const [rows] = await db.promise().query(

"SELECT * FROM users WHERE email=? AND password=?",
[email,password]

);

if(rows.length === 0){

return res.json({
success:false,
message:"Invalid credentials"
});

}

res.json({
success:true,
user:rows[0]
});

} catch(err){

console.log("LOGIN ERROR:", err);

res.status(500).json({
success:false
});

}

});



/* ==============================
   GET PRODUCTS
============================== */

router.get("/products", async (req,res)=>{

const [rows] = await db.promise().query(

`SELECT p.*, a.name, a.upi_id
FROM products p
JOIN artisans a
ON p.artisan_id = a.id
ORDER BY p.id DESC`

);

res.json(rows);

});



/* ==============================
   CREATE ORDER
============================== */

router.post("/order", async (req,res)=>{

try{

const {product_id, payment_id, user_id} = req.body;

const deliveryDate = new Date();
deliveryDate.setDate(deliveryDate.getDate()+5);

await db.promise().query(

`INSERT INTO orders
(product_id, user_id, razorpay_payment_id, payment_status, delivery_date)
VALUES (?,?,?,?,?)`,

[
product_id,
user_id,
payment_id,
"Paid",
deliveryDate
]

);

res.json({success:true});

}catch(err){

console.log(err);

res.status(500).json({success:false});

}

});



/* ==============================
   GET USER ORDERS
============================== */

router.get("/orders/:userId", async (req,res)=>{

const {userId} = req.params;

const [rows] = await db.promise().query(

`SELECT o.*, p.title, p.price
FROM orders o
JOIN products p
ON o.product_id = p.id
WHERE o.user_id = ?`,

[userId]

);

res.json(rows);

});


module.exports = router;