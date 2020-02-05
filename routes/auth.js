var express = require('express');
var auth = express.Router();
var app = express();
const mongoClient = require('mongodb').MongoClient;
var jwt = require('jsonwebtoken');

/* GET users listing. */

auth.get('/api/login/user/:userID/pass/:passID', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const userID = req.params['userID'];
    const passID = req.params['passID'];
    const token = jwt.sign({ data: userID }, 'secret', { expiresIn: '1h' });
    let obj = {};
    mongoClient.connect('mongodb://127.0.0.1:27017/',function(err, db) {
        if (err) throw err;
        var dbo = db.db("Anshuman");
        dbo.collection("auth").find({userName: userID}).toArray(function(err, result) {
            if (err) throw err;
            if (result.length > 0) {
                if ( userID === result[0].userName && passID === result[0].password )
                    obj = {status: true, message: 'Successfully Login', token: token};
                else
                    obj = {status: false, message: 'Failed to Login', token: null};
            } else {
                obj = {status: false, message: 'No Data found', token: null};
            }
            res.status(200).send(JSON.stringify(obj));
        });
    });
});
// try {
//     var decoded = jwt.verify(token, 'wrong-secret');
// } catch(err) {
//     // err
// }
module.exports = auth;