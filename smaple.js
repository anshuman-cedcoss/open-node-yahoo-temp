const mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://127.0.0.1:27017/',function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var myobj = { name: "Cedcoss Inc", address: "Highway 37" };
    // dbo.collection("customers").insertOne(myobj, function(err, res) {
    //     if (err) throw err;
    //     console.log("1 document inserted");
    // });
    dbo.collection("customers").find({name: 'Company Inc'}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result[0].name);
        db.close();
    });
});