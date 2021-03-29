const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const serviceAccount = require("./permision.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const app = express()

app.use(cors({origin: true}))
const {approve} = require("./handler/pre-approve");

app.get('/helloWorld', (req, res) =>{
    return res.status(200).send('Hello welcome to my API')
})

app.post("/approve", (req , res)=> {

    const user = {

        cartValue: req.body.cartValue,
        monthPlan: req.body.monthPlan,
    };

    //down payment minimum
    const miniMumDownPayment = (req.body.cartValue / 100) * 30;
    //shopping credit
    const shoppingCredit = user.cartValue - miniMumDownPayment;
    //interest rate
    const interest = (shoppingCredit * user.monthPlan) / 100

    //
    const totalInterestPayable = interest * user.monthPlan ;


    const monthlyRepayable = (shoppingCredit + totalInterestPayable) / user.monthPlan
    return res.status(200).json({msg: monthlyRepayable})
});


exports.api = functions.https.onRequest(app)