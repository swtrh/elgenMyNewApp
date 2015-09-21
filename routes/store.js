var express = require('express');
var router = express.Router();
var MongoClient=require("mongodb").MongoClient;
var mongoURL='mongodb://messagewriter:'+process.env.pw+'@ds042898.mongolab.com:42898/myspecialmongo';

router.get('/', function(req,res,next){
    res.render('store',{title:'konbe store',messageURL:process.env.MESSAGE_URL})
})

router.route('/message').post( function(req, res,next) {
    var txtMessage=(req.body.message || 'empty message');
    //Storing message in DB
    MongoClient.connect(mongoURL, function(err,db){
        console.log("Connected to DB");
        db.collection('messages').insert({'message':txtMessage},{w:1}, function(err,item){
            if(err){
                console.log("Error storing to DB ",err);
                db.close();
                res.status(400).send('Error unable to store message '+txtMessage);
            }else{
                db.close();
                console.log("message stored in db "+txtMessage);
                res.status(200).send('Message stored '+txtMessage);
            }
        });
    });
   console.log('Receiving message '+req.body.message);   
 });

module.exports = router;
