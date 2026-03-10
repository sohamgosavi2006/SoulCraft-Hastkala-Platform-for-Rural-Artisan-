/* =========================
HELPERS
========================= */

function showError(id,message){

const input=document.getElementById(id);
const error=document.getElementById(id+"Error");

if(input) input.style.border="1px solid red";
if(error) error.innerText=message;

}

function clearError(id){

const input=document.getElementById(id);
const error=document.getElementById(id+"Error");

if(input) input.style.border="";
if(error) error.innerText="";

}


/* =========================
REGISTER
========================= */

async function registerUser(){

let valid=true;

const fields=[
"name",
"email",
"phone",
"password",
"address",
"city",
"state",
"pincode"
];

fields.forEach(id=>{

const input=document.getElementById(id);

if(!input || input.value.trim()===""){

showError(id,"Required");
valid=false;

}else{

clearError(id);

}

});

if(!valid) return;


/* SEND DATA */

const body={

full_name:document.getElementById("name").value,
email:document.getElementById("email").value,
phone:document.getElementById("phone").value,
password:document.getElementById("password").value,
address:document.getElementById("address").value,
city:document.getElementById("city").value,
state:document.getElementById("state").value,
pincode:document.getElementById("pincode").value

};

try{

const res=await fetch("http://localhost:4000/api/register",{

method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(body)

});

const data=await res.json();

if(data.success){

alert("Registration successful");
window.location="login.html";

}else{

alert(data.message || "Registration failed");

}

}catch(err){

console.log(err);
alert("Server error");

}

}


/* =========================
LOGIN
========================= */

async function loginUser(){

let valid=true;

const email=document.getElementById("email");
const password=document.getElementById("password");

if(email.value.trim()==""){
showError("email","Email required");
valid=false;
}else clearError("email");

if(password.value.trim()==""){
showError("password","Password required");
valid=false;
}else clearError("password");

if(!valid) return;

try{

const res=await fetch("http://localhost:4000/api/login",{

method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({

email:email.value,
password:password.value

})

});

const data=await res.json();

if(data.success){

localStorage.setItem("user",JSON.stringify(data.user));

alert("Login successful");

window.location="marketplace.html";

}else{

alert("Invalid login");

}

}catch(err){

console.log(err);
alert("Server error");

}

}