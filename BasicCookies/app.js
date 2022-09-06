// Packages leke aao sabse pehle 
const express = require('express');
const cookieParser = require('cookie-parser');
const { cookie } = require('express/lib/response');

// ab apni application ko bolo ki in dono packages ko use karlein
const app = express();
app.use(cookieParser());

// home page ka route banana hai bas ab 
// routing nai pata? dhakkan bacche 
// http://expressjs.com/en/starter/basic-routing.html idhar padhlena
app.get('/',(req,res)=>{
    res.send("Hamari Pyari Basic Cookie App");
});

// port number batana hai ab app ka ki kidhar chalegi vo exactly 
app.listen(8000,()=>console.log("Hamari Pyari App 8000 port par hai"));

// TODO - Ab test karo itna code likh ke ki chalri hai ya nahin
// PART 1 SUCCESSFULLY COMPLETED LET'S GO AND GET COOKIES NOW

app.get('/setNewCookie',(req,res)=>{
    res.cookie(`Cookie Name`,`Encrypted String`);
    res.send('Cookie has been baked');
});

// COOKIE BAN GAYI
app.get('/getCookies',(req,res)=>{
    res.send(req.cookies);
})

// ITNA SECURITY BREACH OHMYGOD

/* 
1. HTTPonly -> isse cookies ko javascript se access nahin kar sakte hum, document.cookie likhte hi console me sari cookies ajati hain
2. Secure -> agar ye attribute lagadete hain to fir HTTPS ke upar hi chalengi cookies aur agar HTTP hai to mana kardega vo
3. sameSite -> isse privacy leaks ni hote, by default none hota hai ye to extensions / third party apps track kar skti hain users aur konsi websites pe jare hain agar hum "Lax" use karte hain to usse ye faeda hota hai ki ye cookie tab hi access hogi jab cookie ka domain aur site ka domain match karega, agar "Strict" use kardia to fir ek publisher ke same domain pe bhi nahin chalegi ye
4. Expiry -> govt websites / banking websites pe apne ap logout hojata hai timer ke sath
*/

// LET'S NOW WRITE SECURE COOKIE CODE YAYY
app.get('/setSecureCookie',(req,res)=>{
    res.cookie(`Secure cookie`,`Secure cookie ki encrypted value`,{
        maxAge: 6000,
        expires: new Date('07 09 2022'),
        secure: false, 
        httpOnly: true,
        sameSite: 'lax'
    });
    res.send('Secure cookie bangayi');
});
// V.IMP NOTE -> localhost non HTTPS hota hai to abhi secure:false kara hai but always use secure:true

// Deleting Cookies 
app.get('/deleteCookie',(req,res)=>{
    res.clearCookie();
    res.send('Cookies have been deleted');
});

// Homework: Figure out how to use this concept to authenticate users on your application